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
            return (
              '<div class="d-inline-block">' +
              '<a href="javascript:;" class="btn btn-sm btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="ri-more-2-line"></i></a>' +
              '<div class="dropdown-menu dropdown-menu-end m-0">' +
              '<a href="javascript:;" class="dropdown-item text-danger delete-record delete-product" data-nomor_order="' +
              full.nomor_order +
              '">Delete</a>' +
              "</div>" +
              '<a href="javascript:;" class="btn btn-sm btn-text-secondary rounded-pill btn-icon item-edit"><i class="ri-edit-box-line"></i></a>'
            );
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

    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: true,
      positionClass: "toast-bottom-center",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };

    // Fungsi untuk menampilkan pesan toastr dari local storage
    function showStoredToastr() {
      const storedMessage = localStorage.getItem("successMessage");
      if (storedMessage) {
        toastr.success(storedMessage);
        localStorage.removeItem("successMessage"); // Hapus pesan dari local storage setelah ditampilkan
      }
    }

    showStoredToastr();

    // Event listener untuk tombol "Hapus" di dalam tabel
    dt_scrollable_table.on("click", ".delete-product", function () {
      var nomor_order = $(this).data("nomor_order"); // Ambil nomor_order dari atribut data-nomor_order

      if (nomor_order) {
        // Jika nomor_order valid, tampilkan modal konfirmasi
        $("#confirmDelete").data("nomor_order", nomor_order); // Simpan nomor_order pada modal
        $("#basicModal").modal("show"); // Tampilkan modal konfirmasi
      } else {
        console.error("Error: nomor_order is undefined or invalid");
        toastr.error("Nomor Order tidak valid");
      }
    });

    // Event listener untuk tombol "Hapus" di dalam modal konfirmasi
    $("#confirmDelete").on("click", function () {
      var nomor_order = $(this).data("nomor_order");

      // Lakukan pemrosesan penghapusan
      $.ajax({
        url: "/delete-product/" + nomor_order,
        type: "DELETE",
        success: function () {
          // Jika penghapusan berhasil
          dt_scrollable_table.DataTable().ajax.reload(); // Muat ulang data tabel
          $("#basicModal").modal("hide"); // Sembunyikan modal konfirmasi
          toastr.error("Produk berhasil dihapus!");
        },
        error: function (error) {
          // Jika terjadi kesalahan saat penghapusan
          console.error("Error:", error.responseText);
          toastr.error("Terjadi kesalahan saat menghapus produk");
        },
      });
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
// Event listener tombol delete
// dt_scrollable_table.on("click", ".delete-product", function () {
//   var data = dt_scrollable_table
//     .DataTable()
//     .row($(this).parents("tr"))
//     .data();
//   var nomor_order = data.nomor_order;
//   if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
//     $("#basicModal").modal("show");

//     $.ajax({
//       url: "/delete-product/" + nomor_order,
//       type: "DELETE",
//       success: function () {
//         // alert(response.message);
//         localStorage.setItem("successMessage", "Produk berhasil dihapus!");
//         dt_scrollable_table.DataTable().ajax.reload();
//       },
//       error: function (error) {
//         console.error("Error:", error.responseText);
//         toastr.error("Terjadi kesalahan saat menghapus produk");
//       },
//     });
//   }
// });
