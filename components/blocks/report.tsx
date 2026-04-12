'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Users,
  CheckCircle2,
  XCircle,
  PieChart,
  Info,
  TrendingUp,
  Globe,
  Clock,
  Fingerprint,
} from 'lucide-react';

export default function ReportDashboard({ data }: { data: any }) {
  const [showSignature, setShowSignature] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 70) return '#34D399';
    if (score >= 40) return '#ffde73';
    return '#ff4d6b';
  };

  const getScoreGlow = (score: number) => {
    if (score >= 70) return 'rgba(52,211,153,0.15)';
    if (score >= 40) return 'rgba(255,222,115,0.15)';
    return 'rgba(255,77,107,0.15)';
  };

  const getRiskColor = (risk: string) => {
    const key = risk.toLowerCase();
    if (key === 'low') return '#34D399';
    if (key === 'medium') return '#ffde73';
    return '#ff4d6b';
  };

  const allocColors = ['#3B82F6', '#34D399', '#a78bfa', '#ffde73', '#ff4d6b'];

  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (data.trustScore / 100) * circumference;
  const scoreColor = getScoreColor(data.trustScore);
  const riskColor = getRiskColor(data.riskLevel);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#080D1A',
        color: '#E2E8F0',
        padding: '2.5rem 1.5rem',
        fontFamily: "'Syne', 'Plus Jakarta Sans', system-ui, sans-serif",
      }}>
      {/* Font imports */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .rdb-body { font-family: 'Inter', sans-serif; }
        .rdb-mono { font-family: 'DM Mono', monospace; }
        .rdb-display { font-family: 'Syne', sans-serif; }

        .rdb-card {
          background: #0F1928;
          border: 0.5px solid rgba(255,255,255,0.06);
          border-radius: 16px;
        }

        .rdb-card-elevated {
          background: #131F30;
          border: 0.5px solid rgba(255,255,255,0.08);
          border-radius: 16px;
        }

        .rdb-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #4A6080;
        }

        .rdb-alloc-bar > div {
          transition: opacity 0.2s ease;
        }
        .rdb-alloc-bar > div:hover {
          opacity: 1 !important;
          filter: brightness(1.15);
        }

        .rdb-flag-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 0.5px solid rgba(255,255,255,0.04);
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          line-height: 1.55;
          color: #C8D8E8;
        }
        .rdb-flag-item:last-child { border-bottom: none; }

        .rdb-catalyst-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 0.5px solid rgba(255,255,255,0.04);
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          line-height: 1.55;
          color: #C8D8E8;
        }
        .rdb-catalyst-item:last-child { border-bottom: none; }

        .rdb-utility-tag {
          padding: 5px 14px;
          background: #0A1020;
          border: 0.5px solid rgba(255,255,255,0.07);
          border-radius: 100px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #7A9BB8;
        }

        .rdb-sig-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: rgba(52,211,153,0.07);
          border: 0.5px solid rgba(52,211,153,0.18);
          border-radius: 100px;
          cursor: pointer;
          transition: background 0.2s;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #34D399;
        }
        .rdb-sig-badge:hover { background: rgba(52,211,153,0.12); }

        .rdb-divider {
          border: none;
          border-top: 0.5px solid rgba(255,255,255,0.05);
        }

        /* Noise texture overlay on cards */
        .rdb-card::before, .rdb-card-elevated::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.4;
        }
      `}</style>

      <div
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem',
        }}>
        {/* ── HEADER ─────────────────────────────────────────────────── */}
        <header
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1.5rem',
            paddingBottom: '1.75rem',
            borderBottom: '0.5px solid rgba(255,255,255,0.05)',
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
            }}>
            {/* Title row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.75rem',
              }}>
              <h1
                className='rdb-display'
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: '#F0F6FF',
                  lineHeight: 1.05,
                }}>
                {data.projectName}
              </h1>

              <span
                className='rdb-display'
                style={{
                  padding: '4px 14px',
                  background: 'rgba(59,130,246,0.08)',
                  border: '0.5px solid rgba(59,130,246,0.22)',
                  borderRadius: 100,
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#60A5FA',
                  textTransform: 'uppercase',
                }}>
                ${data.ticker}
              </span>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '4px 12px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '0.5px solid rgba(255,255,255,0.07)',
                  borderRadius: 100,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  color: '#6B8CAE',
                  textTransform: 'uppercase',
                }}>
                <Globe
                  size={11}
                  style={{ opacity: 0.7 }}
                />
                {data.category}
              </span>
            </div>

            {/* AI Verified badge */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <button
                className='rdb-sig-badge'
                onMouseEnter={() => setShowSignature(true)}
                onMouseLeave={() => setShowSignature(false)}>
                <ShieldCheck size={12} />
                AI Generated & Verified
              </button>

              {showSignature && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 36,
                    zIndex: 20,
                    width: 320,
                    padding: '12px 14px',
                    background: '#0F1928',
                    border: '0.5px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                    boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
                  }}>
                  <div
                    className='rdb-label'
                    style={{ marginBottom: 6 }}>
                    Cryptographic Signature
                  </div>
                  <div
                    className='rdb-mono'
                    style={{
                      fontSize: 11,
                      color: '#3B82F6',
                      wordBreak: 'break-all',
                      lineHeight: 1.6,
                    }}>
                    {data.signature || '0xAI_VERIFIED_HASH_UNAVAILABLE_IN_DB'}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Meta info */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              alignItems: 'flex-end',
            }}>
            <span
              style={{ display: 'flex', alignItems: 'center', gap: 5 }}
              className='rdb-label'>
              <Clock size={10} /> Updated: Just Now
            </span>
            <span
              style={{ display: 'flex', alignItems: 'center', gap: 5 }}
              className='rdb-label'>
              <Fingerprint size={10} />
              <span
                className='rdb-mono'
                style={{
                  fontSize: 10,
                  color: '#4A6080',
                  letterSpacing: '0.08em',
                }}>
                {data.authorId?.slice(0, 8)}...
              </span>
            </span>
          </div>
        </header>

        {/* ── SUMMARY + SCORE ROW ─────────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '1.25rem',
            alignItems: 'stretch',
          }}>
          {/* Executive Summary */}
          <div
            className='rdb-card'
            style={{
              position: 'relative',
              padding: '1.75rem 2rem',
              overflow: 'hidden',
            }}>
            {/* subtle top accent line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '2rem',
                right: '2rem',
                height: 1,
                background:
                  'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)',
              }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                marginBottom: '1rem',
              }}>
              <Info
                size={13}
                color='#3B82F6'
              />
              <span className='rdb-label'>Executive Summary</span>
            </div>
            <p
              className='rdb-body'
              style={{
                fontSize: 15,
                lineHeight: 1.75,
                color: '#C8D8E8',
                fontWeight: 400,
              }}>
              {data.executiveSummary}
            </p>
          </div>

          {/* Score + Risk stack */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              minWidth: 220,
            }}>
            {/* Trust Score radial */}
            <div
              className='rdb-card'
              style={{
                position: 'relative',
                flex: 1,
                padding: '1.5rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(ellipse at 50% 60%, ${getScoreGlow(data.trustScore)}, transparent 70%)`,
                  borderRadius: 'inherit',
                }}
              />
              <div
                style={{
                  position: 'relative',
                  width: 108,
                  height: 108,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <svg
                  width='108'
                  height='108'
                  style={{ transform: 'rotate(-90deg)' }}>
                  <circle
                    cx='54'
                    cy='54'
                    r={radius}
                    stroke='rgba(255,255,255,0.04)'
                    strokeWidth='10'
                    fill='none'
                  />
                  <circle
                    cx='54'
                    cy='54'
                    r={radius}
                    stroke={scoreColor}
                    strokeWidth='10'
                    fill='none'
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap='round'
                    style={{
                      transition:
                        'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)',
                    }}
                  />
                </svg>
                <div
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <span
                    className='rdb-display rdb-mono'
                    style={{
                      fontSize: 30,
                      fontWeight: 700,
                      color: scoreColor,
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                    }}>
                    {data.trustScore}
                  </span>
                  <span
                    className='rdb-label'
                    style={{ marginTop: 2, fontSize: 8 }}>
                    /100
                  </span>
                </div>
              </div>
              <span
                className='rdb-label'
                style={{ marginTop: 10 }}>
                Trust Score
              </span>
            </div>

            {/* Risk Level */}
            <div
              className='rdb-card'
              style={{
                position: 'relative',
                flex: 1,
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: `0.5px solid ${riskColor}22`,
              }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(ellipse at 50% 100%, ${riskColor}0A, transparent 70%)`,
                  borderRadius: 'inherit',
                }}
              />
              <AlertTriangle
                size={24}
                color={riskColor}
                style={{ marginBottom: 10 }}
              />
              <span
                className='rdb-label'
                style={{ marginBottom: 6 }}>
                Risk Profile
              </span>
              <span
                className='rdb-display'
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: riskColor,
                }}>
                {data.riskLevel}
              </span>
            </div>
          </div>
        </div>

        {/* ── SECURITY + TEAM ROW ─────────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.25rem',
          }}>
          {/* Security */}
          <div
            className='rdb-card'
            style={{
              position: 'relative',
              padding: '1.5rem 1.75rem',
              overflow: 'hidden',
            }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                marginBottom: '1.25rem',
              }}>
              <ShieldCheck
                size={13}
                color='#3B82F6'
              />
              <span className='rdb-label'>Security Audit</span>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              {data.security.audited ? (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    padding: '6px 14px',
                    background: 'rgba(52,211,153,0.07)',
                    border: '0.5px solid rgba(52,211,153,0.2)',
                    borderRadius: 100,
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#34D399',
                  }}>
                  <CheckCircle2 size={13} /> Audited & Verified
                </div>
              ) : (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    padding: '6px 14px',
                    background: 'rgba(255,77,107,0.07)',
                    border: '0.5px solid rgba(255,77,107,0.2)',
                    borderRadius: 100,
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#ff4d6b',
                  }}>
                  <XCircle size={13} /> Unaudited
                </div>
              )}
            </div>

            <p
              className='rdb-body'
              style={{
                fontSize: 13,
                lineHeight: 1.65,
                color: '#6B8CAE',
                paddingLeft: '0.85rem',
                borderLeft: '1.5px solid rgba(255,255,255,0.07)',
              }}>
              {data.security.details}
            </p>
          </div>

          {/* Team & Backers */}
          <div
            className='rdb-card'
            style={{
              position: 'relative',
              padding: '1.5rem 1.75rem',
              overflow: 'hidden',
            }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                marginBottom: '1.25rem',
              }}>
              <Users
                size={13}
                color='#3B82F6'
              />
              <span className='rdb-label'>Identity & Backers</span>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '6px 14px',
                  background: data.teamAndBackers.is_doxxed
                    ? 'rgba(52,211,153,0.07)'
                    : 'rgba(255,222,115,0.07)',
                  border: `0.5px solid ${data.teamAndBackers.is_doxxed ? 'rgba(52,211,153,0.2)' : 'rgba(255,222,115,0.2)'}`,
                  borderRadius: 100,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: data.teamAndBackers.is_doxxed ? '#34D399' : '#ffde73',
                }}>
                {data.teamAndBackers.is_doxxed ? (
                  <>
                    <CheckCircle2 size={13} /> Public Team
                  </>
                ) : (
                  <>
                    <AlertTriangle size={13} /> Anonymous Team
                  </>
                )}
              </div>
            </div>

            <p
              className='rdb-body'
              style={{
                fontSize: 13,
                lineHeight: 1.65,
                color: '#6B8CAE',
                paddingLeft: '0.85rem',
                borderLeft: '1.5px solid rgba(255,255,255,0.07)',
              }}>
              {data.teamAndBackers.details}
            </p>
          </div>
        </div>

        {/* ── TOKENOMICS ─────────────────────────────────────────────── */}
        <div
          className='rdb-card'
          style={{
            position: 'relative',
            padding: '1.75rem 2rem',
            overflow: 'hidden',
          }}>
          {/* Header row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '1.75rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <PieChart
                size={13}
                color='#3B82F6'
              />
              <span className='rdb-label'>Tokenomics Distribution</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div
                className='rdb-label'
                style={{ marginBottom: 4 }}>
                Total Supply
              </div>
              <div
                className='rdb-display rdb-mono'
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#E2E8F0',
                  letterSpacing: '-0.02em',
                }}>
                {data.tokenomics.total_supply}
              </div>
            </div>
          </div>

          {/* Allocation bar */}
          <div
            className='rdb-alloc-bar'
            style={{
              display: 'flex',
              height: 10,
              borderRadius: 100,
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.04)',
              marginBottom: '1.5rem',
              gap: 1,
            }}>
            {data.tokenomics.allocations.map((alloc: any, i: number) => (
              <div
                key={i}
                title={`${alloc.category}: ${alloc.percentage}%`}
                style={{
                  width: `${alloc.percentage}%`,
                  background: allocColors[i % allocColors.length],
                  opacity: 0.85,
                  cursor: 'crosshair',
                  transition: 'opacity 0.2s',
                }}
              />
            ))}
          </div>

          {/* Legend */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '1rem',
              marginBottom: '1.75rem',
            }}>
            {data.tokenomics.allocations.map((alloc: any, i: number) => (
              <div
                key={i}
                style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 2,
                      background: allocColors[i % allocColors.length],
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className='rdb-label'
                    style={{
                      fontSize: 9,
                      color: '#4A6080',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                    {alloc.category}
                  </span>
                </div>
                <span
                  className='rdb-display rdb-mono'
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: '#D8E8F5',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}>
                  {alloc.percentage}
                  <span
                    style={{ fontSize: 13, fontWeight: 400, color: '#4A6080' }}>
                    %
                  </span>
                </span>
              </div>
            ))}
          </div>

          {/* Utility tags */}
          <div
            style={{
              paddingTop: '1.25rem',
              borderTop: '0.5px solid rgba(255,255,255,0.05)',
            }}>
            <div
              className='rdb-label'
              style={{ marginBottom: 10 }}>
              Core Utility
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {data.tokenomics.utility.map((u: string, i: number) => (
                <span
                  key={i}
                  className='rdb-utility-tag'>
                  {u}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── FLAGS + CATALYSTS ─────────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem',
          }}>
          {/* Green Flags */}
          <div
            className='rdb-card'
            style={{
              position: 'relative',
              padding: '1.5rem 1.5rem',
              overflow: 'hidden',
            }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                background:
                  'linear-gradient(90deg, transparent, rgba(52,211,153,0.3), transparent)',
              }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                marginBottom: '1rem',
              }}>
              <CheckCircle2
                size={12}
                color='#34D399'
              />
              <span
                className='rdb-label'
                style={{ color: '#34D399', opacity: 0.8 }}>
                Positive Vectors
              </span>
            </div>
            <div>
              {data.greenFlags.map((flag: string, i: number) => (
                <div
                  key={i}
                  className='rdb-flag-item'>
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: '#34D399',
                      marginTop: 6,
                      flexShrink: 0,
                    }}
                  />
                  <span>{flag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Red Flags */}
          <div
            className='rdb-card'
            style={{
              position: 'relative',
              padding: '1.5rem 1.5rem',
              overflow: 'hidden',
              border: '0.5px solid rgba(255,77,107,0.12)',
            }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                background:
                  'linear-gradient(90deg, transparent, rgba(255,77,107,0.4), transparent)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: 140,
                height: 140,
                background:
                  'radial-gradient(circle, rgba(255,77,107,0.06), transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                marginBottom: '1rem',
              }}>
              <AlertTriangle
                size={12}
                color='#ff4d6b'
              />
              <span
                className='rdb-label'
                style={{ color: '#ff4d6b', opacity: 0.8 }}>
                Threat Vectors
              </span>
            </div>
            <div style={{ position: 'relative' }}>
              {data.redFlags.map((flag: string, i: number) => (
                <div
                  key={i}
                  className='rdb-flag-item'>
                  <AlertTriangle
                    size={12}
                    color='#ff4d6b'
                    style={{ marginTop: 2, flexShrink: 0 }}
                  />
                  <span>{flag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Catalysts */}
          <div
            className='rdb-card'
            style={{
              position: 'relative',
              padding: '1.5rem 1.5rem',
              overflow: 'hidden',
            }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                background:
                  'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)',
              }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                marginBottom: '1rem',
              }}>
              <TrendingUp
                size={12}
                color='#3B82F6'
              />
              <span
                className='rdb-label'
                style={{ color: '#3B82F6', opacity: 0.8 }}>
                Future Catalysts
              </span>
            </div>
            <div>
              {data.catalysts.map((catalyst: string, i: number) => (
                <div
                  key={i}
                  className='rdb-catalyst-item'>
                  <div
                    style={{
                      width: 1.5,
                      alignSelf: 'stretch',
                      background: 'rgba(59,130,246,0.25)',
                      borderRadius: 4,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  />
                  <span>{catalyst}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
