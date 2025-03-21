import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../../public/assets/logo_black.png'
type StudentData = {
  name: string;
  regNo: string;
  email: string;
  phone?: string;
  department?: string;
  semester?: string;
  rollNumber?: string;
  examName: string;
  examDate: string;
  examTime: string;
  venue: string;
};

export const downloadAdmitCard = (studentData: StudentData) => {
  const doc = new jsPDF();

  // Draw a border around the entire page
  doc.setDrawColor(0, 128, 128);
  doc.setLineWidth(0.2);
  doc.rect(10, 10, 190, 277);

  // Set document properties
  doc.setProperties({
    title: `ANARC Exam Admit Card - ${studentData.name}`,
    subject: 'Examination Admit Card',
    author: 'ANARC - Robotics Club, NIT Agartala',
    keywords: 'admit card, exam, robotics',
    creator: 'ANARC Exam System'
  });

  // Add logo at the top center
 doc.addImage(logo, 'PNG', 92, 20, 20, 20); // Adjusted position and size

  // Add a title below the logo
  doc.setFontSize(22);
  doc.setTextColor(0, 128, 128);
  doc.text('ANARC ROBOTICS CLUB', 105, 55, { align: 'center' });

  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text('NIT AGARTALA', 105, 63, { align: 'center' });

  doc.setFontSize(16);
  doc.text('SOAR 13.O EXAMINATION ADMIT CARD', 105, 73, { align: 'center' });

  // Add a line below the header
  doc.setDrawColor(0, 128, 128);
  doc.setLineWidth(0.5);
  doc.line(20, 78, 190, 78);

  // Registration details (Adjusted positions)
  let yPos = 85;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Registration Number:', 20, yPos);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(`ANARC25${studentData.regNo.slice(0, 2).toUpperCase()}${studentData.regNo.slice(2, 5).toUpperCase()}${studentData.regNo.slice(-2)}`, 75, yPos);

  yPos += 8;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Examination:', 20, yPos);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(studentData.examName, 75, yPos);

  yPos += 8;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Date:', 20, yPos);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(studentData.examDate, 75, yPos);

  yPos += 8;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Time:', 20, yPos);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(studentData.examTime, 75, yPos);

  yPos += 8;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Venue:', 20, yPos);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(studentData.venue, 75, yPos);

  // Student information table
  doc.setFontSize(14);
  doc.setTextColor(0, 128, 128);
  doc.text('STUDENT INFORMATION', 105, yPos + 20, { align: 'center' });

  autoTable(doc, {
    startY: yPos + 25,
    head: [['Field', 'Details']],
    body: [
      ['Name', studentData.name],
      ['Email', studentData.email],
      studentData.rollNumber ? ['Roll Number', studentData.rollNumber || ''] : ['', ''],
      studentData.department ? ['Department', studentData.department || ''] : ['', ''],
      studentData.semester ? ['Semester', studentData.semester || ''] : ['', ''],
      studentData.phone ? ['Phone', studentData.phone || ''] : ['', ''],
    ].filter(row => row[0] !== ''), // Remove empty rows
    theme: 'striped',
    headStyles: { fillColor: [0, 128, 128], textColor: 255, fontStyle: 'bold' },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 40 }, 1: { cellWidth: 'auto' } },
    margin: { left: 20, right: 20 }
  });

  // Important Instructions
  const currentY = (doc as any).lastAutoTable.finalY + 25;
  doc.setFontSize(14);
  doc.setTextColor(0, 128, 128);
  doc.text('IMPORTANT INSTRUCTIONS', 105, currentY, { align: 'center' });

  const instructions = [
    '1. Arrive by 11:30 AM with a student ID and a soft copy of the admit card (hard copy optional).',
    '2. Bring necessary stationery; electronic devices are not allowed.',
    '3. Follow seating arrangements and write correct details.',
    '4. No talking, sharing materials, or malpractice.',
    '5. Any misconduct will lead to disqualification.'
  ];

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);

  let y = currentY + 10;
  instructions.forEach(instruction => {
    doc.text(instruction, 20, y);
    y += 7;
  });

  // Add Approved Stamp (moved slightly above bottom corner)
  const approvedBadge = 'https://png.pngtree.com/png-clipart/20221010/original/pngtree-original-approved-stamp-and-badget-design-red-grunge-png-image_8669616.png';
  doc.addImage(approvedBadge, 'PNG', 150, 230, 30, 30);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('ANARC – ROBOTICS CLUB, NIT AGARTALA | INNOVATE. BUILD. EXCEL. © ' + new Date().getFullYear(), 105, 285, { align: 'center' });

  doc.save(`${studentData.regNo}_admit_card.pdf`);
};
