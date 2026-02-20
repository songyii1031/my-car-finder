import React from 'react';
import { colors, typography, spacing, borderRadius } from '../styles/theme';
import type { CarRecommendation } from '../utils/recommend';

interface CarResultCardProps {
  recommendation: CarRecommendation;
  rank?: number;
}

const CarResultCard: React.FC<CarResultCardProps> = ({ recommendation, rank }) => {
  const { category, origin, example, reason, emoji } = recommendation;

  const rankLabels = ['1st', '2nd', '3rd'];
  const rankLabel = rank ? rankLabels[rank - 1] : undefined;

  const getOriginBgColor = () => {
    switch (origin) {
      case '국내차': return '#E8F5E9';
      case '외제차': return '#E3F2FD';
      default: return '#FFF3E0';
    }
  };

  return (
    <div style={{
      backgroundColor: colors.white,
      borderRadius: borderRadius.xl,
      padding: spacing.xl,
      marginBottom: spacing.lg,
      border: `1px solid ${colors.gray200}`,
      boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    }}>
      {/* 헤더 */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.lg }}>
        <div style={{
          width: 56, height: 56,
          borderRadius: borderRadius.lg,
          backgroundColor: colors.gray100,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          marginRight: spacing.lg, flexShrink: 0,
        }}>
          <span style={{ fontSize: 32 }}>{emoji}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.sm }}>
            {rankLabel && (
              <span style={{
                backgroundColor: colors.primary,
                padding: `${spacing.xs}px ${spacing.sm}px`,
                borderRadius: borderRadius.sm,
                fontSize: typography.fontSize.small,
                fontWeight: typography.fontWeight.bold,
                color: colors.white,
              }}>
                {rankLabel}
              </span>
            )}
            <span style={{ fontSize: typography.fontSize.h4, fontWeight: typography.fontWeight.bold, color: colors.gray900 }}>
              {category}
            </span>
          </div>
          <span style={{
            backgroundColor: getOriginBgColor(),
            padding: `${spacing.xs}px ${spacing.md}px`,
            borderRadius: 9999,
            fontSize: typography.fontSize.small,
            fontWeight: typography.fontWeight.medium,
            color: colors.gray700,
          }}>
            {origin}
          </span>
        </div>
      </div>

      {/* 어울리는 차종 */}
      <div style={{ backgroundColor: colors.gray50, borderRadius: borderRadius.md, padding: spacing.lg, marginBottom: spacing.lg }}>
        <div style={{ fontSize: typography.fontSize.caption, color: colors.gray600, marginBottom: spacing.xs }}>어울리는 차종</div>
        <div style={{ fontSize: typography.fontSize.body2, fontWeight: typography.fontWeight.semibold, color: colors.gray900, lineHeight: 1.5 }}>
          {example}
        </div>
      </div>

      {/* 선정 이유 */}
      <div style={{ borderLeft: `3px solid ${colors.primary}`, paddingLeft: spacing.lg }}>
        <div style={{ fontSize: typography.fontSize.body3, color: colors.gray700, lineHeight: 1.75 }}>
          {reason}
        </div>
      </div>
    </div>
  );
};

export default CarResultCard;
