import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface HeroProps {
  onOpenModal: () => void;
}

const vertexShader = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  // Simplex noise helper
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    float aspect = uResolution.x / uResolution.y;
    vec2 uvAspect = vec2(uv.x * aspect, uv.y);

    float t = uTime * 0.0003;

    // Layered noise for organic gradient
    float n1 = snoise(vec3(uvAspect * 3.0, t));
    float n2 = snoise(vec3(uvAspect * 6.0 + 50.0, t * 1.5)) * 0.5;
    float n3 = snoise(vec3(uvAspect * 1.5 + 100.0, t * 0.7)) * 0.3;
    float noise = (n1 + n2 + n3) / 1.8;
    noise = noise * 0.6 + 0.4; // remap to 0.1-1.0

    // Grid lines
    float gridScale = 40.0;
    vec2 grid = fract(uv * gridScale);
    float gridLine = smoothstep(0.0, 0.02, min(grid.x, grid.y)) * smoothstep(0.0, 0.02, min(1.0 - grid.x, 1.0 - grid.y));
    float gridEffect = 1.0 - (1.0 - gridLine) * 0.03;

    // Color mixing
    vec3 color = mix(uColor1, uColor2, noise);
    color = mix(color, uColor3, smoothstep(0.6, 0.9, noise) * 0.08);
    color *= gridEffect;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const Hero = ({ onOpenModal }: HeroProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Skip WebGL on mobile or reduced motion
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile || prefersReducedMotion) {
      setIsWebGLSupported(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) {
      setIsWebGLSupported(false);
      return;
    }

    // Compile shaders
    const compileShader = (src: string, type: number) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };

    const vs = compileShader(vertexShader, gl.VERTEX_SHADER);
    const fs = compileShader(fragmentShader, gl.FRAGMENT_SHADER);
    if (!vs || !fs) {
      setIsWebGLSupported(false);
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      setIsWebGLSupported(false);
      return;
    }

    gl.useProgram(program);

    // Fullscreen quad
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uResolution = gl.getUniformLocation(program, 'uResolution');
    const uColor1 = gl.getUniformLocation(program, 'uColor1');
    const uColor2 = gl.getUniformLocation(program, 'uColor2');
    const uColor3 = gl.getUniformLocation(program, 'uColor3');

    gl.uniform3f(uColor1, 1.0, 1.0, 1.0);
    gl.uniform3f(uColor2, 0.91, 0.91, 0.91);
    gl.uniform3f(uColor3, 0.83, 0.975, 0.19);

    // Resize
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // Animation
    let rafId: number;
    const startTime = performance.now();
    const render = () => {
      const elapsed = performance.now() - startTime;
      gl.uniform1f(uTime, elapsed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [prefersReducedMotion]);

  // Entry animations
  useEffect(() => {
    if (prefersReducedMotion) {
      // Show content immediately without animation
      [canvasRef, titleRef, subtitleRef, ctaRef, badgesRef].forEach(ref => {
        if (ref.current) {
          (ref.current as HTMLElement).style.opacity = '1';
        }
      });
      return;
    }

    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(canvasRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });
    tl.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'expo.out' },
      0.5
    );
    tl.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'expo.out' },
      0.7
    );
    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' },
      0.9
    );

    // Badges
    const badges = badgesRef.current?.children;
    if (badges) {
      tl.fromTo(
        badges,
        { scale: 0, rotation: -10 },
        {
          scale: 1,
          rotation: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'elastic.out(1, 0.5)',
        },
        1.0
      );
    }
  }, [prefersReducedMotion]);

  const badgePositions = [
    { top: '15%', left: '10%' },
    { top: '12%', right: '12%' },
    { bottom: '18%', left: '15%' },
    { bottom: '15%', right: '10%' },
  ];

  const badgeLabels = ['Сайты', 'Приложения', 'Дизайн', 'Под ключ'];

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* WebGL Canvas or CSS Fallback */}
      {isWebGLSupported ? (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            opacity: prefersReducedMotion ? 1 : 0,
          }}
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #e8e8e8 100%)',
          }}
        />
      )}

      {/* Floating badges - hidden on mobile */}
      <div 
        ref={badgesRef} 
        className="absolute inset-0 z-10 pointer-events-none hidden md:block"
        style={{ opacity: prefersReducedMotion ? 1 : 0 }}
      >
        {badgePositions.map((pos, i) => (
          <div
            key={i}
            className="absolute flex items-center justify-center text-white text-sm font-medium"
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              backgroundColor: 'var(--black)',
              ...pos,
              animation: prefersReducedMotion ? 'none' : `float ${4 + i * 0.5}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {badgeLabels[i]}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <h1
          ref={titleRef}
          className="text-display mb-6"
          style={{ color: 'var(--black)', maxWidth: 900, opacity: prefersReducedMotion ? 1 : 0 }}
        >
          Создаём цифровые<br />продукты
        </h1>
        <p
          ref={subtitleRef}
          className="text-body mb-10"
          style={{ color: 'var(--gray-text)', maxWidth: 600, opacity: prefersReducedMotion ? 1 : 0 }}
        >
          Разработка сайтов и мобильных приложений для бизнеса. От концепции до запуска.
        </p>
        <button
          ref={ctaRef}
          onClick={onOpenModal}
          className="underline-button"
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
          aria-label="Оставить заявку на разработку"
        >
          Оставить заявку
        </button>
      </div>

      {/* Float keyframes */}
      {!prefersReducedMotion && (
        <style>{`
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(-15px) rotate(3deg); }
          }
        `}</style>
      )}
    </section>
  );
};

export default Hero;
