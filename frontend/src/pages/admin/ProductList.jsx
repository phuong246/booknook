import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation, useUploadProductImageMutation } from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu"; 

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [author, setAuthor] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("author", author);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Thêm không thành công, xin thử lại",{
          autoClose: 1500,
        });
      } else {
        toast.success(`${data.name} được thêm thành công`,{
          autoClose:1500,
        });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Thêm không thành công, xin thử lại",{
        autoClose:1500,
      });
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-[6rem] mt-18 sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-2">
        <h1 className="text-2xl font-semibold mb-25 flex justify-center">Thêm sách</h1>
          <div className="h-6">Hình ảnh</div>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt=""
                className="block mx-auto max-h-[150px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Tải ảnh lên"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-black"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex justify-between">
              <div className="one">
                <label htmlFor="name">Tên sách</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[25rem] border rounded-lg text-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two ml-10 ">
                <label htmlFor="name block">Đơn giá</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[25rem] border rounded-lg text-black"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="one">
                <label htmlFor="name block">Số lượng</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[25rem] border rounded-lg text-black"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="two ml-10 ">
                <label htmlFor="name block">Tác giả</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[25rem] border rounded-lg text-black"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
            </div>

            <div>
            <label htmlFor="" className="my-5">
              Mô tả
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 border rounded-lg w-[100%] text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            </div>

            <div className="flex justify-between">
              <div>
                <label htmlFor="name block">Kho</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[25rem] border rounded-lg text-black"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">Hạng mục</label> <br />
                <select
                  placeholder="Chọn hạng mục"
                  className="p-4 mb-3 w-[25rem] border rounded-lg text-black"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="py-4 px-7 mt-5 rounded-lg text-lg text-white font-medium bg-pink-600"
            >
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;