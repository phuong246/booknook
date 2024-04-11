import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation, useDeleteProductMutation, useGetProductByIdQuery, useUploadProductImageMutation } from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const AdminProductUpdate = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);

  console.log(productData);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [author, setAuthor] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock);

  // hook
  const navigate = useNavigate();

  // Fetch categories using RTK Query
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();

  // Define the update product mutation
  const [updateProduct] = useUpdateProductMutation();

  // Define the delete product mutation
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setAuthor(productData.author);
      setImage(productData.image);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Thêm thành công :>", {
        position: "top-right",
        autoClose: 1500,
      });
      setImage(res.image);
    } catch (err) {
      toast.success("Thêm không thành công :<", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("author", author);
      formData.append("countInStock", stock);

      // Update product using the RTK Query mutation
      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error, {
          position: "top-right",
          autoClose: 1500,
        });
      } else {
        toast.success(`Cập nhật sách thành công `, {
          position: "top-right",
          autoClose: 1500,
        });
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Cập nhật thất bại, thử lại ik :<", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Bạn có chắc muốn xóa sản phẩm này?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" đã được xóa`, {
        position: "top-right",
        autoClose: 1500,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Xóa sách thất bại, thử lại ik :<", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  return (
    <>
      <div className="container xl:mx-[6rem] mt-18 sm:mx-[0]">
        <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <div className="md:w-3/4 p-3">
          <h1 className="text-2xl font-semibold mb-25 flex justify-center">Cập nhật sách</h1>
            <div className="h-6">Hình ảnh</div>

            {image && (
              <div className="text-center">
                <img
                  src={image}
                  alt=""
                  className="block mx-auto max-h-[200px]"
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
                  className="text-black"
                />
              </label>
            </div>

            <div className="p-3">
              <div className="flex justify-between">
                <div className="one">
                  <label htmlFor="name">Tên sách</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[25rem] border rounded-lg text-black mr-[5rem]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="two">
                  <label htmlFor="name block">Đơn giá</label> <br />
                  <input
                    type="number"
                    className="p-4 mb-3 w-[25rem] border rounded-lg text-black "
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <label htmlFor="name block">Số lượng</label> <br />
                  <input
                    type="number"
                    min="1"
                    className="p-4 mb-3 w-[25rem] border rounded-lg text-black mr-[5rem]"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="name block">Tác giả</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[25rem] border rounded-lg text-black "
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
              </div>

              <label htmlFor="" className="my-5">
                Mô tả
              </label>
              <textarea
                type="text"
                className="p-2 mb-3  border rounded-lg w-[100%] text-black"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="flex justify-between">
                <div>
                  <label htmlFor="name block">Kho</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[25rem] border rounded-lg text-black "
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="">Hạng mục</label> <br />
                  <select
                    placeholder="Choose Category"
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

              <div className="">
                <button
                  onClick={handleSubmit}
                  className="py-4 px-7 mt-5 rounded-lg text-lg font-bold  bg-green-600 mr-6"
                >
                  Cập nhật
                </button>
                <button
                  onClick={handleDelete}
                  className="py-4 px-7 mt-5 rounded-lg text-lg font-bold  bg-pink-600"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductUpdate;