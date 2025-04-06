import React, { forwardRef } from "react";

const NotaCetak = forwardRef(({ nota }, ref) => {
  if (!nota) return null;

  return (
    <div
      ref={ref}
      className="print-only hidden print:block w-[80mm] bg-white text-black p-4 text-sm mx-auto shadow-md"
    >
      <h2 className="text-center text-lg font-bold mb-2">NOTA PEMBAYARAN</h2>
      <hr className="mb-2 border-gray-400" />

      <div className="space-y-1">
        <p>
          <span className="font-medium">Nama Pelanggan:</span>{" "}
          {nota.nama_pelanggan}
        </p>
        <p>
          <span className="font-medium">Barang:</span> {nota.barang}
        </p>
        <p>
          <span className="font-medium">Jumlah:</span> {nota.jumlah}
        </p>
        <p>
          <span className="font-medium">Harga Satuan:</span> Rp
          {nota.harga_satuan}
        </p>
        <p className="font-semibold mt-2">Total: Rp{nota.total}</p>
        <p className="text-xs text-gray-500 mt-1">
          Tanggal: {new Date(nota.tanggal).toLocaleString()}
        </p>
      </div>

      <hr className="my-3 border-gray-300" />
      <p className="text-center mt-2 text-sm">Terima kasih telah berbelanja!</p>
    </div>
  );
});

export default NotaCetak;
