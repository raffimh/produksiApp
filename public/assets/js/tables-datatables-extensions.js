"use strict";

// $(function () {
//   setTimeout(function () {
//     var dt_scrollable_table = $(".dt-scrollableTable");
//     // Scrollable
//     // --------------------------------------------------------------------

//     if (dt_scrollable_table.length) {
//       var dt_scrollableTable = dt_scrollable_table.DataTable({
//         ajax: {
//           url: "/api/products",
//           type: "GET",
//           dataSrc: "data",
//         },
//         processing: true,
//         serverSide: true,
//         success: function (response) {
//           console.log("Data berhasil di terima", response);
//         },
//         columns: [
//           { data: "nomor_order" },
//           { data: "quantity" },
//           { data: "nama_barang" },
//           { data: "size" },
//           { data: "tutup", render: translateStatus },
//           { data: "body", render: translateStatus },
//           { data: "elektroplating", render: translateStatus },
//           { data: "isi", render: translateStatus },
//           { data: "rakit", render: translateStatus },
//           { data: "qc", render: translateStatus },
//           { data: "packing", render: translateStatus },
//           { data: null }, // Action button
//           {
//             // Actions
//             targets: -1,
//             title: "Actions",
//             searchable: false,
//             orderable: false,
//             render: function (data, type, full, meta) {
//               return (
//                 // '<div class="d-inline-block">' +
//                 // // '<a href="javascript:;" class="btn btn-sm btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="ri-more-2-line"></i></a>' +
//                 // // '<div class="dropdown-menu dropdown-menu-end m-0">' +
//                 // // '<a href="javascript:;" class="dropdown-item text-danger delete-record">Delete</a>' +
//                 // "</div>" +
//                 // "</div>" +
//                 '<a href="javascript:;" class="btn btn-sm btn-text-secondary rounded-pill btn-icon item-edit"><i class="ri-edit-box-line"></i></a>'
//               );
//             },
//           },
//         ],
//         // Scroll options
//         scrollY: "500px",
//         scrollX: true,
//         dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
//       });
//     }
//     function translateStatus(value) {
//       switch (value) {
//         case 1:
//           return '<span class="badge rounded-pill bg-label-primary">On Process</span>';
//         case 2:
//           return '<span class="badge rounded-pill bg-label-warning">Delayed</span>';
//         case 3:
//           return '<span class="badge rounded-pill bg-label-success">Finished</span>';
//         default:
//           return "";
//       }
//     }
//   }, 500);
// });

document.addEventListener("DOMContentLoaded", function () {
  // Pastikan elemen tabel sudah muncul di DOM
  var dt_scrollable_table = $(".dt-scrollableTable");

  if (dt_scrollable_table.length) {
    dt_scrollable_table.DataTable({
      ajax: {
        url: "/api/products",
        type: "GET",
        dataSrc: "data",
      },
      processing: false,
      serverSide: false,
      searching: true,
      orderable: true,
      columns: [
        { data: "nomor_order" },
        { data: "quantity" },
        { data: "nama_barang" },
        { data: "size" },
        { data: "tutup", render: translateStatus },
        { data: "body", render: translateStatus },
        { data: "elektroplating", render: translateStatus },
        { data: "isi", render: translateStatus },
        { data: "rakit", render: translateStatus },
        { data: "qc", render: translateStatus },
        { data: "packing", render: translateStatus },
        {
          data: null,
          render: function (data, type, full, meta) {
            return '<a href="javascript:;" class="btn btn-sm btn-text-secondary rounded-pill btn-icon item-edit"><i class="ri-edit-box-line"></i></a>';
          },
        },
      ],
      // Scroll options
      scrollY: "500px",
      scrollX: true,
      dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
    });

    // Event listener untuk tombol edit
    dt_scrollable_table.on("click", ".item-edit", function () {
      var data = dt_scrollable_table
        .DataTable()
        .row($(this).parents("tr"))
        .data();
      window.location.href = "/edit-product/" + data.nomor_order;
    });
  }

  function translateStatus(value) {
    switch (value) {
      case 1:
        return '<span class="badge rounded-pill bg-label-primary">On Process</span>';
      case 2:
        return '<span class="badge rounded-pill bg-label-secondary">Delayed</span>';
      case 3:
        return '<span class="badge rounded-pill bg-label-success">Finished</span>';
      default:
        return "";
    }
  }
});
