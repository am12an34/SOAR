
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  // Create a new PDF document
  const doc = new jsPDF();

  // Set properties
  doc.setProperties({
    title: `ANARC Exam Admit Card - ${studentData.name}`,
    subject: 'Examination Admit Card',
    author: 'ANARC - Robotics Club, NIT Agartala',
    keywords: 'admit card, exam, robotics',
    creator: 'ANARC Exam System'
  });

  // Add a title
  doc.setFontSize(22);
  doc.setTextColor(0, 128, 128);
  doc.text('ANARC ROBOTICS CLUB', 105, 20, { align: 'center' });

  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text('NIT AGARTALA', 105, 28, { align: 'center' });

  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('SOAR 13.O EXAMINATION ADMIT CARD', 105, 38, { align: 'center' });

  // Add a line
  doc.setDrawColor(0, 128, 128);
  doc.setLineWidth(0.5);
  doc.line(20, 42, 190, 42);

  // Add registration details
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Registration Number:', 20, 52);

  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(`ANARC25${studentData.regNo.slice(0, 2).toUpperCase()}${studentData.regNo.slice(2, 5).toUpperCase()}${studentData.regNo.slice(-2)}`, 75, 52);

  // Add Exam details
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Examination:', 20, 60);

  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(studentData.examName, 75, 60);

  // Add date and time
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Date:', 20, 68);

  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text('22 March 2025', 75, 68);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Time:', 20, 76);

  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text('12:30 PM - 1:30 PM', 75, 76);

  // Add venue
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Venue:', 20, 84);

  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(studentData.venue, 75, 84);

  // Student information table
  doc.setFontSize(14);
  doc.setTextColor(0, 128, 128);
  doc.text('STUDENT INFORMATION', 105, 100, { align: 'center' });

  // Create table with student information
  autoTable(doc, {
    startY: 105,
    head: [['Field', 'Details']],
    body: [
      ['Name', studentData.name],
      ['Email', studentData.email],
      studentData.rollNumber ? ['Roll Number', studentData.rollNumber || ''] : ['', ''],
      studentData.department ? ['Department', studentData.department || ''] : ['', ''],
      studentData.semester ? ['Semester', studentData.semester || ''] : ['', ''],
      studentData.phone ? ['Phone', studentData.phone || ''] : ['', ''],
    ].filter(row => row[0] !== ''),
    theme: 'striped',
    headStyles: {
      fillColor: [0, 128, 128],
      textColor: 255,
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 40 },
      1: { cellWidth: 'auto' }
    },
    margin: { left: 20, right: 20 }
  });

  // Add instructions with more gap after the table
  const currentY = (doc as any).lastAutoTable.finalY + 20; // Increased space

  doc.setFontSize(14);
  doc.setTextColor(0, 128, 128);
  doc.text('IMPORTANT INSTRUCTIONS', 105, currentY, { align: 'center' });

  const instructions = [
    '1. Arrive 30 minutes early with a valid student ID and admit card.',
    '2. Bring necessary stationery; electronic devices are not allowed unless specified.',
    '3. Follow seating arrangements, write correct details on the answer sheet, and submit it before leaving.',
    '4. No talking, sharing materials, or malpractice; follow the invigilator’s instructions',
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

y += 30;
doc.setFontSize(10);
doc.setTextColor(0, 0, 0);
doc.text(' STUDENT SIGNATURE:', 20, y);

  // Add footer
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('ANARC – ROBOTICS CLUB, NIT AGARTALA | INNOVATE. BUILD. EXCEL. © ' + new Date().getFullYear(), 105, 285, { align: 'center' });

  // Save the PDF
  doc.save(`${studentData.regNo}_admit_card.pdf`);
};
