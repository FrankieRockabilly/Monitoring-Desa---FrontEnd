import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  TextRun,
  WidthType,
  AlignmentType,
  ImageRun,
  BorderStyle,
} from "docx";
import { saveAs } from "file-saver";

export const exportProgramsToWord = async (programs, logoBlob) => {
  const totalProgram = programs.length;
  const totalPending = programs.filter((p) => p.verifikasi === "pending").length;
  const totalDisetujui = programs.filter((p) => p.verifikasi === "disetujui").length;
  const totalDitolak = programs.filter((p) => p.verifikasi === "ditolak").length;

  // === KOP SURAT ===
  const kopTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        children: [
          // Kolom logo
          new TableCell({
            width: { size: 15, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: logoBlob,
                    transformation: { width: 80, height: 80 },
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
          // Kolom teks kop
          new TableCell({
            width: { size: 85, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                children: [new TextRun({ text: "PEMERINTAH KABUPATEN ROKAN HULU", bold: true, size: 28 })],
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [new TextRun({ text: "KECAMATAN UJUNG BATU", bold: true, size: 26 })],
                alignment: AlignmentType.CENTER,
              }),
              // tambahkan enter (line break) setelah nomor telepon
              new Paragraph({
              children: [
                new TextRun({
                  text: "Jl. Jenderal Sudirman No.172 Telp. (0762) 61035",
                  size: 22,
                }),
                new TextRun({ break: 1 }), // ← ini bikin enter
                new TextRun({
                  text: "UJUNG BATU  Kode Pos : 28554",
                  size: 22,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
            ],
          }),
        ],
      }),
    ],
  });

  // === GARIS PEMBATAS ===
  const garis = new Paragraph({
    children: [new TextRun({ text: "______________________________________________________________", size: 20 })],
    alignment: AlignmentType.CENTER,
  });

  // === JUDUL DOKUMEN ===
  const title = new Paragraph({
    text: "PROGRAM DESA KECAMATAN UJUNG BATU",
    heading: HeadingLevel.HEADING1,
    alignment: AlignmentType.CENTER,
    spacing: { before: 300, after: 300 },
  });

  // === RINGKASAN DATA (pakai tabel biar sejajar) ===
  const summaryTable = new Table({
    width: { size: 60, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph("Total Program")], width: { size: 3000, type: WidthType.DXA } }),
          new TableCell({ children: [new Paragraph(`: ${totalProgram}`)] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph("Jumlah Pending")] }),
          new TableCell({ children: [new Paragraph(`: ${totalPending}`)] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph("Jumlah Disetujui")] }),
          new TableCell({ children: [new Paragraph(`: ${totalDisetujui}`)] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph("Jumlah Ditolak")] }),
          new TableCell({ children: [new Paragraph(`: ${totalDitolak}`)] }),
        ],
      }),
    ],
  });

   // === HEADER & ISI TABEL ===
  const headerRow = new TableRow({
    children: [
      { text: "No", width: 500 },
      { text: "Desa", width: 1800 },
      { text: "Jenis Program", width: 2000 },
      { text: "Nama Program", width: 2000 },
      { text: "Alokasi Dana", width: 1500 },
      { text: "Realisasi Dana", width: 1500 },
      { text: "Status", width: 1000 },
    ].map(
      (col) =>
        new TableCell({
          width: { size: col.width, type: WidthType.DXA },
          children: [
            new Paragraph({
              children: [new TextRun({ text: col.text, bold: true })],
              alignment: AlignmentType.CENTER, // 🧭 judul kolom di tengah
            }),
          ],
          shading: { fill: "E0E0E0" }, // warna abu muda biar beda dari isi (opsional)
        })
    ),
  });

  const rowsData = programs.map((program, index) => {
    return new TableRow({
      children: [
        // Kolom No - tengah
        new TableCell({
          width: { size: 500, type: WidthType.DXA },
          children: [new Paragraph({ text: String(index + 1), alignment: AlignmentType.CENTER })],
        }),

        // Kolom nama desa
        new TableCell({
          width: { size: 1800, type: WidthType.DXA },
          children: [new Paragraph({ text: program.nama_desa || "-", alignment: AlignmentType.LEFT })],
        }),

        // Kolom jenis kegiatan
        new TableCell({
          width: { size: 2000, type: WidthType.DXA },
          children: [new Paragraph({ text: program.jenis_kegiatan || "-", alignment: AlignmentType.LEFT })],
        }),

        // Kolom nama program
        new TableCell({
          width: { size: 2000, type: WidthType.DXA },
          children: [new Paragraph({ text: program.program || "-", alignment: AlignmentType.LEFT })],
        }),

        // Kolom alokasi dana
        new TableCell({
          width: { size: 1500, type: WidthType.DXA },
          children: [
            new Paragraph({
              text: new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(program.alokasi_dana || 0),
              alignment: AlignmentType.RIGHT,
            }),
          ],
        }),

        // Kolom realisasi dana
        new TableCell({
          width: { size: 1500, type: WidthType.DXA },
          children: [
            new Paragraph({
              text: new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(program.realisasi_dana || 0),
              alignment: AlignmentType.RIGHT,
            }),
          ],
        }),

        // Kolom status
        new TableCell({
          width: { size: 1000, type: WidthType.DXA },
          children: [
            new Paragraph({
              text: program.verifikasi || "-",
              alignment: AlignmentType.CENTER, // 🧭 status di tengah
            }),
          ],
        }),
      ],
    });
  });

  const table = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...rowsData],
  });

  // === BANGUN DOKUMEN ===
  const doc = new Document({
    sections: [
      {
        children: [
          kopTable,
          garis,
          new Paragraph(" "),
          title,
          summaryTable,
          new Paragraph(" "),
          table,
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "Laporan_Program_Desa.docx");

};
