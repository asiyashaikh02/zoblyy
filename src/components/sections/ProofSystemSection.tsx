import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  GitBranch, 
  Terminal, 
  CheckCircle2, 
  FileCheck, 
  Lock, 
  Eye,
  Award
} from 'lucide-react';
import { PROOF_ARTIFACTS } from '../../data/zoblyData';
import { ProofArtifact } from '../../types';

export const ProofSystemSection: React.FC = () => {
  const [activeArtifact, setActiveArtifact] = useState<ProofArtifact>(PROOF_ARTIFACTS[0]);

  const getStatusBadge = (status: ProofArtifact['status']) => {
    switch (status) {
      case 'DEPLOYED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
            LIVE DEPLOYED
          </span>
        );
      case 'VERIFIED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE]">
            <GitBranch className="w-3.5 h-3.5" />
            GIT VERIFIED
          </span>
        );
      case 'DEFENDED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#FAF5FF] text-[#6B21A8] border border-[#E9D5FF]">
            <ShieldCheck className="w-3.5 h-3.5" />
            CODE DEFENDED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#F1F5F9] text-[#334155]">
            AUDITED
          </span>
        );
    }
  };

  return (
    <section id="proof" className="py-16 sm:py-20 lg:py-28 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-5 sm:w-8 h-[2px] bg-[#16A34A] rounded-full shrink-0" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#16A34A]">
              VERIFIED PROOF ENGINE
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0F172A] tracking-tight leading-[1.18]">
            Not certificates.{' '}
            <span className="text-[#16A34A]">Verifiable engineering proof.</span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#475569] leading-relaxed max-w-2xl font-normal">
            Every project completed at Zobly is verified through cryptographic Git history, live production endpoints, and recorded oral code defense sessions.
          </p>
        </div>

        {/* Proof Showcase Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Artifact List */}
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-[#64748B] mb-2">
              SAMPLE DEFENDED PRODUCTION ARTIFACTS
            </div>

            {PROOF_ARTIFACTS.map((artifact) => {
              const isSelected = artifact.id === activeArtifact.id;
              return (
                <div
                  key={artifact.id}
                  id={`proof-artifact-${artifact.id}`}
                  onClick={() => setActiveArtifact(artifact)}
                  className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#0F172A] shadow-md ring-1 ring-[#0F172A]'
                      : 'bg-white/80 border-[#E2E8F0] hover:bg-white hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-semibold text-[#64748B]">
                      {artifact.track}
                    </span>
                    {getStatusBadge(artifact.status)}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
                    {artifact.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#475569] mt-1 line-clamp-2">
                    {artifact.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-mono text-[#16A34A]">
                    <span>{artifact.metrics}</span>
                    <span className="text-[#2563EB] font-semibold hover:underline flex items-center gap-1">
                      Inspect Dossier <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep Artifact Inspector Panel */}
          <div className="lg:col-span-6">
            <div className="bg-[#0F172A] text-white rounded-2xl p-6 sm:p-8 border border-[#1E293B] shadow-xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#F59E0B]" />
                  <span className="font-mono text-xs text-[#94A3B8]">
                    ZOBLY DEFENSE RECORD #{activeArtifact.id.toUpperCase()}
                  </span>
                </div>
                {getStatusBadge(activeArtifact.status)}
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-[#38BDF8]">
                  TRACK: {activeArtifact.track.toUpperCase()}
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {activeArtifact.title}
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {activeArtifact.description}
                </p>
              </div>

              {/* Defense Rubric Inspection */}
              <div className="p-4 rounded-xl bg-[#1E293B] border border-[#334155] space-y-3">
                <div className="text-xs font-mono font-bold text-[#38BDF8] flex items-center justify-between">
                  <span>ORAL CODE DEFENSE RUBRIC:</span>
                  <span className="text-[#10B981]">PASSED WITH DISTINCTION</span>
                </div>

                <div className="space-y-2 text-xs font-mono text-[#CBD5E1]">
                  <div className="flex items-center justify-between py-1 border-b border-[#334155]/60">
                    <span>1. Architectural Justification</span>
                    <span className="text-[#10B981]">10 / 10</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-[#334155]/60">
                    <span>2. Edge-case & Latency Tradeoffs</span>
                    <span className="text-[#10B981]">9.8 / 10</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>3. Live Code Refactoring Prompt</span>
                    <span className="text-[#10B981]">PASSED</span>
                  </div>
                </div>
              </div>

              {/* Public Proof Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-[#131E33] border border-[#334155] text-xs font-mono space-y-1">
                  <div className="text-[#94A3B8]">DEPLOYED URL</div>
                  <div className="text-[#38BDF8] truncate font-semibold flex items-center gap-1">
                    https://proof.zobly.org/{activeArtifact.id}
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#131E33] border border-[#334155] text-xs font-mono space-y-1">
                  <div className="text-[#94A3B8]">AUDITED REPOSITORY</div>
                  <div className="text-[#4ADE80] truncate font-semibold flex items-center gap-1">
                    git@zobly.org:verified/{activeArtifact.id}
                    <GitBranch className="w-3 h-3 shrink-0" />
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-mono text-[#64748B] flex items-center gap-1.5">
                <Lock className="w-3 h-3" />
                <span>Signatures cryptographically bound to learner identity & panel reviewers.</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
