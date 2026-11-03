import { useEffect, useRef, useState } from "react";

const canvasVariants = {
  walker: {
    metadataUrl: "/hanmi-eye-tracking/hanmi-eye-tracking/metadata.json",
    assetBase: "/hanmi-eye-tracking/hanmi-eye-tracking/assets/",
    title: "초록 행성 위를 걸으며 마우스를 바라보는 파란색 캐릭터",
  },
  reading: {
    metadataUrl: "/hanmi-reading-eye-tracking/metadata.json",
    assetBase: "/hanmi-reading-eye-tracking/assets/",
    title: "마우스를 바라보며 돋보기를 든 캐릭터",
  },
};

export default function CanvasPlayer({
  variant = "walker",
  className = "",
  controls = false,
}) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const trackingRef = useRef(false);
  const pausedRef = useRef(false);
  const [tracking, setTracking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState("이미지 준비 중");
  const config = canvasVariants[variant];

  trackingRef.current = tracking;
  pausedRef.current = paused;

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!root || !canvas || !context) {
      const error = new Error("Canvas를 초기화할 수 없습니다.");
      console.error(error);
      setStatus("Canvas를 사용할 수 없습니다.");
      return undefined;
    }

    let active = true;
    let frames = [];
    let index = 0;
    let elapsed = 0;
    let last = 0;
    let animationFrame = 0;
    let ready = false;
    let visible = false;
    let loadingStarted = false;
    let pointer = null;
    const gaze = { x: 0, y: 0 };
    const trackingMedia = window.matchMedia(
      "(min-width: 1025px) and (hover: hover) and (pointer: fine)",
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let metadata = null;

    const setTrackingFromMedia = (matches) => {
      trackingRef.current = matches;
      setTracking(matches);
      pointer = null;
      gaze.x = 0;
      gaze.y = 0;
      update();
    };

    const draw = () => {
      const image = frames[index];
      if (!image || !metadata) return;

      const offset = metadata.offset[index];
      context.clearRect(0, 0, metadata.stage[0], metadata.stage[1]);
      context.drawImage(image, offset[0], offset[1]);

      if (!trackingRef.current) return;

      const eyes = metadata.eyes[index];
      for (const eye of eyes) {
        const x = offset[0] + eye.x;
        const y = offset[1] + eye.y;
        const { rx, ry } = eye;
        context.save();
        context.beginPath();
        context.ellipse(
          x,
          y,
          rx,
          ry,
          eye.rotation ?? 0,
          0,
          Math.PI * 2,
        );
        context.clip();

        const white = context.createRadialGradient(
          x - rx * 0.3,
          y - ry * 0.4,
          2,
          x,
          y,
          ry * 1.3,
        );
        white.addColorStop(0, "#ffffff");
        white.addColorStop(0.65, "#fcfcfd");
        white.addColorStop(1, "#dce8ed");
        context.fillStyle = white;
        context.fillRect(x - rx * 2, y - ry * 2, rx * 4, ry * 4);

        const pupilX = x + gaze.x * rx * 0.29;
        const pupilY = y + gaze.y * ry * 0.23;
        const pupil = context.createRadialGradient(
          pupilX - rx * 0.12,
          pupilY - ry * 0.12,
          1,
          pupilX,
          pupilY,
          ry * 0.59,
        );
        pupil.addColorStop(0, "#34434a");
        pupil.addColorStop(1, "#101b21");
        context.fillStyle = pupil;
        context.beginPath();
        context.ellipse(
          pupilX,
          pupilY,
          rx * 0.55,
          ry * 0.59,
          0,
          0,
          Math.PI * 2,
        );
        context.fill();

        context.fillStyle = "rgba(255,255,255,.93)";
        context.beginPath();
        context.ellipse(
          pupilX - rx * 0.16,
          pupilY - ry * 0.25,
          rx * 0.12,
          ry * 0.13,
          0,
          0,
          Math.PI * 2,
        );
        context.fill();
        context.fillStyle = "rgba(255,255,255,.35)";
        context.beginPath();
        context.arc(
          pupilX + rx * 0.16,
          pupilY + ry * 0.18,
          rx * 0.06,
          0,
          Math.PI * 2,
        );
        context.fill();
        context.restore();
      }

      if (metadata.occluders) {
        context.save();
        context.beginPath();
        for (const [x, y, width] of metadata.occluders[index]) {
          context.rect(offset[0] + x - 0.5, offset[1] + y - 0.5, width + 1, 2);
        }
        context.clip();
        context.drawImage(image, offset[0], offset[1]);
        context.restore();
      }
    };

    const target = () => {
      if (!trackingRef.current || !pointer || !metadata) {
        return { x: 0, y: 0 };
      }

      const eyes = metadata.eyes[index];
      const offset = metadata.offset[index];
      const eyeX = offset[0] + (eyes[0].x + eyes[1].x) / 2;
      const eyeY = offset[1] + (eyes[0].y + eyes[1].y) / 2;
      const dx = pointer.x - eyeX;
      const dy = pointer.y - eyeY;
      const distance = Math.hypot(dx, dy);
      const amount = Math.min(1, distance / 210);

      return distance
        ? { x: (dx / distance) * amount, y: (dy / distance) * amount }
        : { x: 0, y: 0 };
    };

    const tick = (now) => {
      animationFrame = 0;
      if (!ready || !visible || document.hidden) {
        last = 0;
        return;
      }

      const delta = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      if (!pausedRef.current) {
        elapsed += delta;
        index = Math.floor(elapsed * metadata.fps) % metadata.count;
      }

      const gazeTarget = target();
      const blend = 1 - Math.exp(-16 * delta);
      gaze.x += (gazeTarget.x - gaze.x) * blend;
      gaze.y += (gazeTarget.y - gaze.y) * blend;
      draw();

      const movingEyes =
        Math.abs(gazeTarget.x - gaze.x) + Math.abs(gazeTarget.y - gaze.y) >
        0.002;
      if (!pausedRef.current || movingEyes) {
        animationFrame = window.requestAnimationFrame(tick);
      } else {
        last = 0;
      }
    };

    function update() {
      if (!ready || !visible || document.hidden) {
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        last = 0;
        return;
      }

      if (reduceMotion.matches) {
        gaze.x = target().x;
        gaze.y = target().y;
        draw();
      }
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    }

    const onPointerMove = (event) => {
      if (!trackingRef.current || event.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      pointer = {
        x: ((event.clientX - rect.left) * metadata.stage[0]) / rect.width,
        y: ((event.clientY - rect.top) * metadata.stage[1]) / rect.height,
      };
      update();
    };
    const onPointerLeave = () => {
      pointer = null;
      update();
    };
    const onVisibilityChange = () => {
      last = 0;
      update();
    };
    const onReduceMotionChange = (event) => {
      pausedRef.current = event.matches;
      setPaused(event.matches);
      update();
    };
    const onTrackingMediaChange = (event) => {
      setTrackingFromMedia(event.matches);
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointercancel", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    trackingMedia.addEventListener("change", onTrackingMediaChange);
    reduceMotion.addEventListener("change", onReduceMotionChange);
    setTrackingFromMedia(trackingMedia.matches);
    setPaused(reduceMotion.matches);

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        last = 0;
        update();
        if (visible) startLoading();
      },
      { rootMargin: "80px" },
    );
    observer.observe(root);

    const load = async () => {
      try {
        const response = await fetch(config.metadataUrl);
        if (!response.ok) {
          throw new Error(`Canvas 데이터를 불러오지 못했습니다 (${response.status}).`);
        }
        metadata = await response.json();
        let nextFrame = 0;
        let loadedCount = 0;
        const worker = async () => {
          while (nextFrame < metadata.count) {
            const frameIndex = nextFrame++;
            const image = new Image();
            const filename = metadata.src.replace(
              "{n}",
              String(frameIndex + 1),
            );
            await new Promise((resolve, reject) => {
              image.onload = resolve;
              image.onerror = () => reject(new Error(filename));
              image.src = `${config.assetBase}${filename}`;
            });
            if (image.decode) await image.decode();
            if (!active) return;
            frames[frameIndex] = image;
            loadedCount += 1;
            if (loadedCount === 1) draw();
            setStatus(`이미지 준비 중 ${loadedCount}/${metadata.count}`);
          }
        };

        await Promise.all(
          Array.from({ length: 4 }, () => worker()),
        );
        if (!active) return;
        ready = true;
        setStatus("");
        update();
      } catch (error) {
        if (!active) return;
        console.error("Canvas 프레임을 불러오지 못했습니다.", error);
        setStatus(`캐릭터 이미지를 불러오지 못했습니다. (${error.message})`);
      }
    };

    function startLoading() {
      if (loadingStarted || !visible) return;
      loadingStarted = true;
      load();
    }

    return () => {
      active = false;
      ready = false;
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointercancel", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      trackingMedia.removeEventListener("change", onTrackingMediaChange);
      reduceMotion.removeEventListener("change", onReduceMotionChange);
      frames = [];
    };
  }, [config, variant]);

  return (
    <div
      className={`hanmi-walker ${className}`.trim()}
      ref={rootRef}
    >
      <canvas
        ref={canvasRef}
        width="1920"
        height="1080"
        role="img"
        aria-label={config.title}
      />
      {status && (
        <span data-status role="status">
          {status}
        </span>
      )}
      {controls && (
        <div className="walker-controls">
          <button
            type="button"
            data-pause
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? "재생" : "일시정지"}
          </button>
          <label>
            <input
              type="checkbox"
              data-track
              checked={tracking}
              disabled={!window.matchMedia(
                "(min-width: 1025px) and (hover: hover) and (pointer: fine)",
              ).matches}
              onChange={(event) => setTracking(event.target.checked)}
            />{" "}
            시선 추적
          </label>
        </div>
      )}
    </div>
  );
}
