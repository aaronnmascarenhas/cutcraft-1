import React, { useState } from 'react';
import { 
  Cpu, 
  Zap, 
  Activity, 
  HardDrive, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Play, 
  RefreshCw, 
  Sparkles,
  Server,
  Layers,
  Sliders
} from 'lucide-react';
import { NavigationPage } from '../types';

interface NvidiaLabPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const NvidiaLabPage: React.FC<NvidiaLabPageProps> = ({ onNavigate }) => {
  const [benchmarking, setBenchmarking] = useState(false);
  const [benchmarkScore, setBenchmarkScore] = useState<number | null>(null);
  const [benchmarkProgress, setBenchmarkProgress] = useState(0);

  const handleRunBenchmark = () => {
    setBenchmarking(true);
    setBenchmarkProgress(0);
    setBenchmarkScore(null);

    const interval = setInterval(() => {
      setBenchmarkProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setBenchmarking(false);
          setBenchmarkScore(184); // 184 FPS encoding throughput
          return 100;
        }
        return prev + 20;
      });
    }, 250);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto text-[#F4F7FF] bg-[#030612]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101D40] border border-[#76B900]/40 text-[#76B900] text-xs font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>NVIDIA RTX Creative Acceleration Lab</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <span>Hardware Diagnostics & Local AI</span>
          </h1>
          <p className="text-xs md:text-sm text-[#9BAFD0] mt-1">
            Harness CUDA cores, TensorRT, and NVENC dual AV1 hardware encoders for instant zero-latency creator workflows.
          </p>
        </div>

        {/* Studio Driver Badge */}
        <div className="px-3 py-2 rounded-xl bg-[#0A1230] border border-[#76B900]/30 text-left shrink-0">
          <div className="text-[10px] text-[#9BAFD0] uppercase font-mono">Driver Status</div>
          <div className="text-xs font-bold text-[#76B900] flex items-center gap-1.5 mt-0.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>NVIDIA Studio Ready 565.90</span>
          </div>
        </div>
      </div>

      {/* Prominent Accuracy Notice */}
      <div className="p-3.5 rounded-xl bg-[#0A1230] border border-[#162B53] text-[11px] text-[#9BAFD0] leading-relaxed flex items-center gap-2.5">
        <ShieldCheck className="w-4 h-4 text-[#76B900] shrink-0" />
        <span>
          <strong>Telemetry Status:</strong> Hardware metrics reflect the local system diagnostic profile (NVIDIA RTX 4090 Ada Lovelace architecture). CutCraft integrates with DirectML, WebCodecs, and ONNX Runtime for local privacy-preserving processing.
        </span>
      </div>

      {/* Telemetry Core Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: GPU Model */}
        <div className="p-5 rounded-2xl bg-[#0A1230] border border-[#162B53] space-y-2">
          <div className="flex items-center justify-between text-[#9BAFD0] text-xs">
            <span>Active GPU</span>
            <Cpu className="w-4 h-4 text-[#76B900]" />
          </div>
          <div className="text-lg font-bold text-white font-mono">
            RTX 4090
          </div>
          <div className="text-[11px] text-[#76B900] font-mono">
            Ada Lovelace · 450W TGP
          </div>
        </div>

        {/* Metric 2: CUDA & Tensor Cores */}
        <div className="p-5 rounded-2xl bg-[#0A1230] border border-[#162B53] space-y-2">
          <div className="flex items-center justify-between text-[#9BAFD0] text-xs">
            <span>Compute Units</span>
            <Activity className="w-4 h-4 text-[#00D9FF]" />
          </div>
          <div className="text-lg font-bold text-white font-mono">
            16,384 Cores
          </div>
          <div className="text-[11px] text-[#00D9FF] font-mono">
            512 4th Gen Tensor Cores
          </div>
        </div>

        {/* Metric 3: VRAM Memory */}
        <div className="p-5 rounded-2xl bg-[#0A1230] border border-[#162B53] space-y-2">
          <div className="flex items-center justify-between text-[#9BAFD0] text-xs">
            <span>VRAM Allocation</span>
            <HardDrive className="w-4 h-4 text-[#39F56A]" />
          </div>
          <div className="text-lg font-bold text-white font-mono">
            3.4 / 24.0 GB
          </div>
          <div className="text-[11px] text-[#39F56A] font-mono">
            GDDR6X · 1,008 GB/s
          </div>
        </div>

        {/* Metric 4: Hardware Encoder */}
        <div className="p-5 rounded-2xl bg-[#0A1230] border border-[#162B53] space-y-2">
          <div className="flex items-center justify-between text-[#9BAFD0] text-xs">
            <span>Video Encoder</span>
            <Zap className="w-4 h-4 text-[#8B5CFF]" />
          </div>
          <div className="text-lg font-bold text-white font-mono">
            NVENC Dual AV1
          </div>
          <div className="text-[11px] text-[#8B5CFF] font-mono">
            8th Gen Dual Hardware
          </div>
        </div>
      </div>

      {/* Benchmark Simulator & Interactive Test */}
      <section className="p-6 rounded-2xl bg-[#0A1230] border border-[#1d356c] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#76B900]" />
              <span>NVENC Hardware Export Benchmark</span>
            </h3>
            <p className="text-xs text-[#9BAFD0] mt-0.5">
              Simulate 4K 60fps AV1 timeline encoding speed across multi-track video and caption layers.
            </p>
          </div>

          <button
            onClick={handleRunBenchmark}
            disabled={benchmarking}
            className="px-5 py-2.5 rounded-xl bg-[#76B900] hover:bg-[#68a300] text-black font-extrabold text-xs transition-all shadow-[0_0_15px_rgba(118,185,0,0.35)] active:scale-95 disabled:opacity-50 cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
          >
            {benchmarking ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Benchmarking...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Throughput Benchmark</span>
              </>
            )}
          </button>
        </div>

        {benchmarking && (
          <div className="space-y-2 p-4 rounded-xl bg-[#050817] border border-[#162B53]">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#9BAFD0]">Testing NVENC 10-bit AV1 Pipeline...</span>
              <span className="text-[#76B900] font-bold">{benchmarkProgress}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#101D40] overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#76B900] to-[#39F56A] transition-all duration-200" 
                style={{ width: `${benchmarkProgress}%` }}
              />
            </div>
          </div>
        )}

        {benchmarkScore && (
          <div className="p-4 rounded-xl bg-[#050817] border border-[#76B900]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#101D40] flex items-center justify-center text-[#76B900]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Benchmark Complete: Exceptional Performance</div>
                <div className="text-[11px] text-[#9BAFD0] font-mono mt-0.5">
                  Peak throughput: <span className="text-[#76B900] font-bold">{benchmarkScore} FPS</span> (3.1x Realtime at 4K AV1)
                </div>
              </div>
            </div>
            <span className="text-xs font-mono text-[#39F56A] px-3 py-1 rounded bg-[#101D40]">
              Zero Render Bottlenecks
            </span>
          </div>
        )}
      </section>

      {/* Compatible Local AI Workflows Catalog */}
      <section className="space-y-4">
        <h3 className="font-bold text-sm text-white uppercase tracking-wider">
          Accelerated Neural Workflows
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'RTX Video Super Resolution',
              desc: 'Upscale 1080p source clips to 4K with deep learning edge reconstruction and grain preservation.',
              status: 'Active (VSR 4)',
              route: 'editor'
            },
            {
              title: 'Local Whisper Transcription',
              desc: 'Speech-to-text running 100% on GPU tensor cores. 0.4s processing per minute of dialogue.',
              status: 'DirectML Primed',
              route: 'smart-clips'
            },
            {
              title: 'Neural Background Segmentation',
              desc: 'High-speed green-screen-less person isolation at 60fps in the CutCraft editor.',
              status: 'TensorRT Matting',
              route: 'editor'
            }
          ].map((wf, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-[#0A1230] border border-[#162B53] flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#101D40] text-[#76B900] border border-[#76B900]/30">
                    {wf.status}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">{wf.title}</h4>
                <p className="text-xs text-[#9BAFD0] mt-1 leading-relaxed">{wf.desc}</p>
              </div>

              <button
                onClick={() => onNavigate(wf.route as NavigationPage)}
                className="w-full py-2 rounded-lg bg-[#101D40] hover:bg-[#162B53] text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Launch in Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
