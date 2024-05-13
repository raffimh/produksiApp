/**
 *  Pages Authentication
 */

"use strict";
// const formAuthentication = document.querySelector("#formAuthentication");

// document.addEventListener("DOMContentLoaded", function (e) {
//   (function () {
//     // Form validation for Add new record
//     if (formAuthentication) {
//       const fv = FormValidation.formValidation(formAuthentication, {
//         fields: {
//           username: {
//             validators: {
//               notEmpty: {
//                 message: "Please enter username",
//               },
//               stringLength: {
//                 min: 6,
//                 message: "Username must be more than 6 characters",
//               },
//             },
//           },
//           email: {
//             validators: {
//               notEmpty: {
//                 message: "Please enter your email",
//               },
//               emailAddress: {
//                 message: "Please enter valid email address",
//               },
//             },
//           },
//           emailUsername: {
//             validators: {
//               notEmpty: {
//                 message: "Please enter email / username",
//               },
//               stringLength: {
//                 min: 6,
//                 message: "Username must be more than 6 characters",
//               },
//             },
//           },
//           password: {
//             validators: {
//               notEmpty: {
//                 message: "Please enter your password",
//               },
//               stringLength: {
//                 min: 6,
//                 message: "Password must be more than 6 characters",
//               },
//             },
//           },
//           "confirm-password": {
//             validators: {
//               notEmpty: {
//                 message: "Please confirm password",
//               },
//               identical: {
//                 compare: function () {
//                   return formAuthentication.querySelector('[name="password"]')
//                     .value;
//                 },
//                 message: "The password and its confirm are not the same",
//               },
//               stringLength: {
//                 min: 6,
//                 message: "Password must be more than 6 characters",
//               },
//             },
//           },
//           terms: {
//             validators: {
//               notEmpty: {
//                 message: "Please agree terms & conditions",
//               },
//             },
//           },
//         },
//         plugins: {
//           trigger: new FormValidation.plugins.Trigger(),
//           bootstrap5: new FormValidation.plugins.Bootstrap5({
//             eleValidClass: "",
//             rowSelector: ".mb-5",
//           }),
//           submitButton: new FormValidation.plugins.SubmitButton(),

//           defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
//           autoFocus: new FormValidation.plugins.AutoFocus(),
//         },
//         init: instance => {
//           instance.on("plugins.message.placed", function (e) {
//             if (e.element.parentElement.classList.contains("input-group")) {
//               e.element.parentElement.insertAdjacentElement(
//                 "afterend",
//                 e.messageElement
//               );
//             }
//           });
//         },
//       });
//     }

//     //  Two Steps Verification
//     const numeralMask = document.querySelectorAll(".numeral-mask");

//     // Verification masking
//     if (numeralMask.length) {
//       numeralMask.forEach(e => {
//         new Cleave(e, {
//           numeral: true,
//         });
//       });
//     }
//   })();
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const formAuthentication = document.querySelector("#formAuthentication");

//   if (formAuthentication) {
//     // Inisialisasi validasi form
//     const fv = FormValidation.formValidation(formAuthentication, {
//       fields: {
//         emailUsername: {
//           validators: {
//             notEmpty: {
//               message: "Please enter email / username",
//             },
//             stringLength: {
//               min: 6,
//               message: "Username must be more than 6 characters",
//             },
//           },
//         },
//         password: {
//           validators: {
//             notEmpty: {
//               message: "Please enter your password",
//             },
//             stringLength: {
//               min: 6,
//               message: "Password must be more than 6 characters",
//             },
//           },
//         },
//       },
//       plugins: {
//         trigger: new FormValidation.plugins.Trigger(),
//         bootstrap5: new FormValidation.plugins.Bootstrap5({
//           eleValidClass: "",
//           rowSelector: ".mb-5",
//         }),
//       },
//     });

//     // Tambahkan event listener untuk submit form
//     formAuthentication.addEventListener("submit", function (e) {
//       e.preventDefault(); // Mencegah pengiriman form default

//       fv.validate().then(function (status) {
//         if (status === "Valid") {
//           // Validasi form sukses, kirim data menggunakan AJAX
//           const formData = new FormData(formAuthentication);

//           fetch("/auth/login", {
//             method: "POST",
//             body: formData,
//           })
//             .then(function (response) {
//               if (!response.ok) {
//                 throw new Error("Server responded with an error");
//               }
//               return response.json();
//             })
//             .then(function (data) {
//               console.log("Response dari server:", data);
//               // Redirect ke halaman setelah login berhasil
//               window.location.href = "/datatables";
//               localStorage.setItem("successMessage", "Berhasil Login");
//             })
//             .catch(function (error) {
//               console.error("Error:", error);
//               alert("Error: " + error.message);
//             });
//         }
//       });
//     });
//   }

//   // Two Steps Verification
//   const numeralMask = document.querySelectorAll(".numeral-mask");

//   // Verification masking
//   if (numeralMask.length) {
//     numeralMask.forEach(e => {
//       new Cleave(e, {
//         numeral: true,
//       });
//     });
//   }
// });

// Login form
$("form#formAuthentication").submit(function (e) {
  e.preventDefault();

  const formData = $(this).serialize();

  $.ajax({
    type: "POST",
    url: "/auth/login",
    data: formData,
    dataType: "json",
    success: function (response) {
      // Redirect to the data tables page after successful login
      window.location.href = "/datatables";
      localStorage.setItem("successMessage", "Berhasil Login");
    },
    error: function (xhr, status, error) {
      try {
        const errorResponse = JSON.parse(xhr.responseText);
        if (
          errorResponse &&
          errorResponse.errors &&
          errorResponse.errors.length > 0
        ) {
          const errorMessages = errorResponse.errors
            .map(error => error.msg)
            .join(", ");
          toastr.error("Validation Error: " + errorMessages); // Tampilkan pesan kesalahan validasi
        } else {
          toastr.error("Unexpected Error: " + xhr.responseText); // Tampilkan pesan kesalahan umum
        }
      } catch (parseError) {
        toastr.error("Invalid username or password");
      }
    },
  });
});
$("form#formSignup").submit(function (e) {
  e.preventDefault();

  const formData = $(this).serialize();

  // Dapatkan token reCAPTCHA setelah formulir dikirim
  const recaptchaToken = grecaptcha.getResponse();

  // Jika token kosong, tampilkan pesan error
  if (!recaptchaToken) {
    alert("Please complete the reCAPTCHA challenge.");
    return;
  }

  // Tambahkan token reCAPTCHA ke data form
  const fullFormData = formData + `&recaptchaToken=${recaptchaToken}`;

  $.ajax({
    type: "POST",
    url: "/auth/register",
    data: fullFormData,
    success: function (response) {
      console.log(response);
      localStorage.setItem("successMessage", "Berhasil Register");
      window.location.href = "/";
    },
    error: function (xhr) {
      console.error("Error:", xhr.responseText);
      alert("Error registering user");
    },
  });
});

// $("form#formSignup").submit(function (e) {
//   e.preventDefault();

//   const formData = $(this).serialize();

//   $.ajax({
//     type: "POST",
//     url: "/auth/register", // Rute untuk pendaftaran
//     data: formData,
//     success: function (response) {
//       console.log(response);
//       // Redirect ke halaman setelah pendaftaran berhasil
//       localStorage.setItem("successMessage", "Berhasil Register");
//       window.location.href = "/";
//     },
//     error: function (error) {
//       console.error("Error:", error.responseText);
//       alert("Error registering user");
//     },
//   });
// });
