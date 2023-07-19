import * as Yup from "yup";

const createSchema = Yup.object({
  title: Yup.string().required("Title wajib di isi"),
  description: Yup.string().required("Description wajib di isi"),
  thumbnail: Yup.string().required("Thumbnail wajib di isi"),
  category_id: Yup.number("categori harus angka").required(
    "categori wajib di isi"
  ),
});

export { createSchema };
