import PDFDocument from 'pdfkit';
import fs from 'fs';

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 60, bottom: 60, left: 72, right: 72 },
  info: {
    Title: '번호이동 신청서',
    Author: '송준호 신청인',
    Subject: 'KT → 고고모바일 번호이동 신청서',
    Creator: 'MNP 신청서 자동 생성'
  }
});

const out = fs.createWriteStream('/workspace/9d1671e2-d4ec-4403-b8da-a11e8557ac94/sessions/agent_d09c0bd7-0e0a-413b-b0bc-9e19c4aceddc/output/mnp-gogomobile-application.pdf');
doc.pipe(out);

const W = doc.page.width - doc.page.margins.left - doc.page.margins.right;

function hr() {
  doc.moveTo(doc.page.margins.left, doc.y);
  doc.lineTo(W + doc.page.margins.left, doc.y);
  doc.strokeColor('#ddd').lineWidth(0.5).stroke();
}

function section(title) {
  doc.moveDown(0.6);
  doc.font('Helvetica-Bold').fontSize(13).fillColor('#111').text(title);
  hr();
}

function kv(label, value, opts = {}) {
  if (doc.y + 22 > doc.page.height - doc.page.margins.bottom) doc.addPage();
  doc.font('Helvetica-Bold').fontSize(10).fillColor('#333').text(label + ':', { continued: true, width: 120 });
  doc.font('Helvetica').fontSize(10).fillColor('#000').text(value, opts);
  doc.moveDown(0.2);
}

function checkbox(label) {
  doc.font('Helvetica').fontSize(10).fillColor('#333');
  doc.text('☐ ' + label);
  doc.moveDown(0.15);
}

function arrow(a, b) {
  doc.fontSize(10).fillColor('#333').text(a, { continued: true });
  doc.font('Helvetica-Bold').fillColor('#2563eb').text(' ▶ ', { continued: true });
  doc.font('Helvetica').fillColor('#333').text(b);
}

// 표지: 번호이동 신청서
doc.moveDown(4);
doc.font('Helvetica-Bold').fontSize(26).fillColor('#111').text('번호이동 신청서', { align: 'center' });
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(13).fillColor('#555').text('Number Portability Application', { align: 'center' });
doc.moveDown(0.8);
doc.font('Helvetica').fontSize(11).fillColor('#444').text('고객님께서 신청하신 번호이동 업무를 처리하기 위한 양식입니다.', { align: 'center' });
doc.moveDown(3);
doc.font('Helvetica').fontSize(10).fillColor('#888').text('작성일: 2026년 06월 05일', { align: 'center' });

// 1. 주문자 정보
doc.addPage();
section('1. 주문자 정보 (Applicant Information)');

kv('전화번호', '010-6206-5023');
kv('이름', '송준호');
kv('주민등록번호', '031221-3******');
kv('주소', '경기도 화성시 송산면 송산포도로 102-25, 303호');
kv('현 통신사', 'KT');
kv('이동 통신사', ' 고고모바일 (KT망 MVNO)');
kv('대리점명', '고고팩토리 (KT)');
kv('대리점 전화번호', '1533-6723');
kv('대리점 담당자 이름', '본인 이름 작성');
kv('대리점 담당자 번호', '본인 휴대폰 번호');
kv('이메일 발송처', 'rn ***@ktoa.or.kr');
kv('팩스', '02-541-4370');

// 2. 신청 내용
section('2. 신청 내용');
doc.moveDown(0.4);
doc.font('Helvetica-Bold').fontSize(10).fillColor('#333').text('현재 KT에서 사용 중인 번호를 고고모바일(KT망)로 이동하여, 저렴한 요금제를 적용받기 위해 번호이동을 신청합니다.');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(10).fillColor('#333').text('번호이동 해제 신청 이유: ' + '기존 KT 요금제 대비 고고모바일(KT망 MVNO)의 저렴한 요금제를 발.');
doc.moveDown(0.3);
doc.font('Helvetica-Bold').fontSize(10).fillColor('#333').text('희망 이동일: ________________ (원하시는 일정을 기입해 주세요)');

// 3. 확인 및 동의
section('3. 번호이동 확인 및 서비스 해지 동의');
doc.moveDown(0.4);
doc.font('Helvetica').fontSize(10).fillColor('#333');
const agree = [
  '1. 본인은 위 기재한 이동전화번호(010-6206-5023)에 대하여, KT와의 이용계약을 해지하고 고고모바일과 신규 이용계약을 체결',
  '   함에 있어 번호이동을 승인합니다.',
  '2. 본인은 번호이동 처리와 관련하여 신청서에 기재된 본인의 정보가 이동통신사업자(고고모바일)에 제공되는 것에 동의합니다.',
  '3. 본 서비스 해지 및 번호이동 절차 진행 과정에서 발생할 수 있는 일시적 서비스 중단을 이해하고 동의합니다.',
];
agree.forEach(l => doc.text(l));

doc.moveDown(0.6);
checkbox('(위 1번에) 동의합니다.');
checkbox('(위 2번에) 동의합니다.');
checkbox('(위 3번에) 동의합니다.');

// 4. 신청인 확인
section('4. 신청인 확인 (본인 서명)');
doc.moveDown(0.4);
doc.font('Helvetica').fontSize(10).fillColor('#333').text('위 내용을 확인하고 서명합니다.');
doc.moveDown(1.0);
doc.font('Helvetica').fontSize(10).fillColor('#333').text('작성일: 2026년 06월 05일');
doc.moveDown(1.2);
hr();
doc.font('Helvetica').fontSize(10).fillColor('#333').text('신청인 성명: 송준호                    서명: ______________________', { align: 'center' });

// 5. 대리점 확인
section('5. 대리점 확인');
doc.moveDown(0.4);
doc.font('Helvetica').fontSize(10).fillColor('#333').text('대리점 담당자 확인란입니다. 아래 항목을 작성해 주세요.');
doc.moveDown(0.5);
kv('담당자명', '______________________________________');
kv('확인 일시', '____년 __월 __일 __:__');
kv('전화번호', '1533-6723 또는 대리점 휴대폰');
doc.moveDown(0.6);
hr();
doc.font('Helvetica').fontSize(10).fillColor('#333').text('담당자 서명: ______________________               날인:', { align: 'right' });

// 4. 첨부 서류
section('6. 신청 시 준비 서류');
doc.font('Helvetica').fontSize(10).fillColor('#333');
doc.text('필수: 신분증(주민등록증/운전면허증) 사본');
doc.text('필수: 본 서식(인쇄하여 서명한 신청서)');
doc.text('※ 신분증 사진 이미지는 함께 발송해 주세요 (이메일: rnp@ktoa.or.kr, 팩스: 02-541-4370)');

// 하단 안내
doc.moveDown(1.0);
hr();
doc.font('Helvetica').fontSize(9).fillColor('#666').text('본 신청서는 모요플랜(고고모바일) 번호이동 해제 안내 플로우에 따라 작성되었습니다. 제출은 이메일 또는 팩스로 접수 바랍니다.', { align: 'center' });

doc.end();
out.on('finish', () => console.log('PDF 생성 완료'));
