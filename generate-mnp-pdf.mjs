import PDFDocument from 'pdfkit';
import fs from 'fs';

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 60, bottom: 60, left: 60, right: 60 },
  info: { Title: '번호이동 신청서', Author: '신청인', Subject: 'KT → 고고모바일 번호이동 신청', Creator: 'MNP Generator' }
});

const outPath = '/workspace/9d1671e2-d4ec-4403-b8da-a11e8557ac94/sessions/agent_d09c0bd7-0e0a-413b-b0bc-9e19c4aceddc/output/번호이동_신청서_고고모바일.pdf';
const out = fs.createWriteStream(outPath);
doc.pipe(out);

function centerText(text, opts = {}) {
  doc.text(text, Object.assign({ align: 'center' }, opts));
}

function field(label, value) {
  doc.font('Helvetica-Bold').fontSize(11).fillColor('#222').text(label, { continued: true });
  doc.font('Helvetica').fillColor('#333');
  doc.text(`  ${value}`);
}

doc.moveDown(0.5);
centerText('번 호 이 동 신 청 서', { fontSize: 22 });
doc.moveDown(0.3);
centerText('Number Portability Application', { fontSize: 12, color: '#555' });
doc.moveDown(1);

doc.font('Helvetica-Bold').fontSize(12).fillColor('#111').text('1. 신청인 정보');
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(11);
doc.text('이 름 : 송 준 호');
doc.text('생년월일 : 2003년 12월 21일');
doc.text('주 소 : 경기도 화성시 송산면 송산포도로 102-25, 303호');
doc.text('연락처 : 010-6206-5023');
doc.text('이메일 : ______________________________________');
doc.moveDown(0.8);

doc.font('Helvetica-Bold').fontSize(12).fillColor('#111').text('2. 번호이동 신청 내용');
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(11);
doc.text('현 재 통 신 사 : KT');
doc.text('이 통 사 : 고고모바일 (KT망 MVNO)');
doc.text('이동전화번호 : 010-6206-5023');
doc.moveDown(0.5);

doc.moveDown(0.3);
doc.font('Helvetica-Bold').fontSize(11).fillColor('#111').text('신 청  사 유');
doc.font('Helvetica').fontSize(11).fillColor('#333');
doc.text('고고모바일(KT망)의 저렴한 요금제를 발견하여 기존 KT 요금제 대비 비용 효율화를 위해 번호이동을 신청합니다.');
doc.moveDown(0.8);

doc.font('Helvetica-Bold').fontSize(12).fillColor('#111').text('3. 서비스 해지 및 이관 동의');
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(11).fillColor('#333');
doc.text('본인은 위 기재한 번호(010-6206-5023)에 대하여 KT와의 이동전화 서비스 이용계약을  해지하고, 고고모바일과 새로운 이동전화 이용계약을 체결함에 있어 번호이동을 승인합니다.');
doc.moveDown(0.3);
doc.text('번호이동 처리와 관련하여 필요한 서류 열람 및 본인 확인에 동의합니다.');
doc.moveDown(1.0);

doc.font('Helvetica-Bold').fontSize(12).fillColor('#111').text('4. 신청인 서명');
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(11).fillColor('#333');
doc.text('작성일 : 2026년 6월 5일');
doc.moveDown(1.2);
doc.text('신청인 성명 : 송 준 호 (서명) ________________________');
doc.moveDown(1.0);

doc.font('Helvetica-Bold').fontSize(11).fillColor('#111').text('대리점 확인');
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(11).fillColor('#333');
doc.text('대리점명: 고고팩토리(KT)');
doc.text('담당자명: ________________________');
doc.text('전화번호: 1533-6723');
doc.text('확인일시: ________________________');
doc.moveDown(0.8);
doc.text('담당자 서명: ________________________', { align: 'right' });

doc.end();

out.on('finish', () => console.log('PDF 생성 완료:', outPath));
