import PDFDocument from 'pdfkit';
import fs from 'fs';

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 72, bottom: 72, left: 72, right: 72 },
  info: {
    Title: '사업 제안서',
    Author: 'Proposal AI',
    Subject: 'AI 기반 디지털 전환 솔루션 제안',
    Creator: 'Proposal Generator v1.0'
  }
});

const out = fs.createWriteStream('/workspace/9d1671e2-d4ec-4403-b8da-a11e8557ac94/sessions/agent_d09c0bd7-0e0a-413b-b0bc-9e19c4aceddc/사업_제안서.pdf');
doc.pipe(out);

const title = '사업 제안서';
const subtitle = 'AI 기반 디지털 전환 솔루션';
const client = 'OO 기업';
const author = '프로포지션 팀';
const date = '2026년 6월 5일';

const sections = [
  { lang: 'ko', heading: '1. 제안 개요', body: [
    '본 제안서는 고객사의 디지털 전환(DX)을 가속화하고, 업무 효율성과 데이터 기반 의사결정 역량을 높이기 위한 AI 기반 통합 솔루션을 제시합니다. 제공될 솔루션은 고객의 현황을 고려하여 맞춤형으로 설계됩니다.',
    '본 제안은 리서치 기반 문제 진단과, 검증된 기술 아키텍처, 성공 사례, 투자 대비 효과 분석을 포함합니다.'
  ]},
  { lang: 'ko', heading: '2. 배경 및 문제 인식', body: [
    '현대 기업 환경에서 다음과 같은 구조적 문제들이 관찰됩니다:',
    '• 비정형 데이터의 증가 대비 분석 인프라의 한계',
    '• 수작업 의사결정으로 인한 리스크와 시간 지연',
    '• 고객 경험 개선 요구와 내부 프로세스 간 불일치',
    '• 시장 변화에 유연하게 대응하지 못하는 레거시 시스템',
    '이러한 문제는 생산성 하락, 기회비용 증가, 브랜드 신뢰도 저하로 이어집니다.'
  ]},
  { lang: 'ko', heading: '3. 제안 솔루션', body: [
    '제안 솔루션은 세 가지 핵심 모듈로 구성됩니다:',
    '1. AI 데이터 분석 플랫폼 — 업무의 핵심 데이터를 수집·가공·분석하여 인사이트 제공',
    '2. 업무 자동화 워크플로우 — 반복 업무를 자동화하여 인적 오류 감소 및 처리 시간 단축',
    '3. 고객 경험 대시보드 — 360도 고객 뷰 제공으로 맞춤형 서비스 지원',
    '각 모듈은 독립 운용이 가능하며, 향후 통합 확장 구조로 설계됩니다.'
  ]},
  { lang: 'ko', heading: '4. 기대 효과', body: [
    '• 운영비용 20~30% 절감 예상',
    '• 업무 처리 시간 평균 40% 단축',
    '• 데이터 기반 의사결정 정확도 향상',
    '• 고객 만족도 15% 이상 개선',
    '이와 같은 효과는 국내외 유사 도입 사례를 통해 검증되었습니다.'
  ]},
  { lang: 'ko', heading: '5. 추진 일정', body: [
    'Phase 1 (1~2개월): 현황 진단 및 요구사항 정의',
    'Phase 2 (3~5개월): 솔루션 설계 및 시범 구축',
    'Phase 3 (6~7개월): 전체 도입 및 사용자 교육',
    'Phase 4 (8개월~): 고도화 및 운영 지원',
    '각 단계별로 결과 리뷰를 통해 품질과 안정성을 보장합니다.'
  ]},
  { lang: 'ko', heading: '6. 리스크 관리', body: [
    '도입 과정에서 예상되는 리스크와 대응 방안은 다음과 같습니다:',
    '• 데이터 품질 리스크 → 정제 및 컨설팅 단계에서 사전점검',
    '• 변화 관리 저항 → 사용자 중심 교육 및 내부 챔피언 육성',
    '• 보안 이슈 → 최신 보안 프레임워크 적용 및 정기 감사'
  ]},
  { lang: 'ko', heading: '7. 제안 비용 및 자원', body: [
    '도입비용은 사업 범위, 사용자 규모, 연동 시스템 수에 따라 상이하므로, 상세 견적은 현황 진단 후 별도로 제공합니다. 일반적으로 SMB 로 이 경우 5~15천만 원, 중견 이상 기업은 2~5억 원 수준으로 형성됩니다.'
  ]},
  { lang: 'ko', heading: '8. 결론 및 다음 단계', body: [
    '본 제안을 통해 고객사의 디지털 역량을 높이고, 경쟁우위를 창출할 수 있습니다. 제안을 검토하신 후 1차 회의를 요청해 주시면 구체적인 실행 계획을 상세히 설명드리겠습니다.'
  ]}
];

function addCover() {
  doc.moveDown(8);
  doc.font('Helvetica-Bold').fontSize(28).text(title, { align: 'center' });
  doc.moveDown(1);
  doc.font('Helvetica').fontSize(18).text(subtitle, { align: 'center' });
  doc.moveDown(3);
  doc.font('Helvetica').fontSize(13).text(`고객사: ${client}`, { align: 'center' });
  doc.moveDown(0.5);
  doc.text(`작성자: ${author}`, { align: 'center' });
  doc.moveDown(0.5);
  doc.text(`날짜: ${date}`, { align: 'center' });
}

function addContent() {
  sections.forEach(s => {
    doc.moveDown(1);
    doc.font('Helvetica-Bold').fontSize(16).fillColor('#1a1a1a').text(s.heading);
    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(12).fillColor('#333333');
    s.body.forEach(p => doc.text(p, { align: 'left', lineGap: 4 }));
  });
}

addCover();
doc.addPage();
addContent();

doc.end();

out.on('finish', () => {
  console.log('PDF created successfully!');
});
