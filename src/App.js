import { useState } from "react";
import Button from "./components/Button";
import { products } from "./staticData";

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [isProduct, setIsProduct] = useState(products[0]);
    const [count, setCount] = useState(1);
    const [isCart, setIsCart] = useState(false);
    const [isData, setIsData] = useState([]);
    const [isActive, setIsActive] = useState({ size: "S", price: 69 });

    const totalQnt = isData.reduce((total, row) => total + row.qnt, 0);
    const totalPrice = isData.reduce((total, row) => total + row.price, 0);

    const handleCloseModal = () => {
        setIsOpen(false);
        setIsCart(false);
    };

    const handleCheckout = () => {
        setIsOpen(true);
        setIsData([...isData, { ...isProduct, size: isActive.size, qnt: count, price: isActive.price * count }]);
    };

    const handleSizeSelect = (size, price) => {
        setIsActive({ size, price });
    };

    const handleQuantityChange = (delta) => {
        setCount((prev) => Math.max(1, prev + delta));
    };

    return (
        <div className="pt-[7.5rem] relative">
            <div className="max-w-3xl mx-auto flex px-4 flex-col md:flex-row items-center md:gap-16 gap-6 md:mb-24 mb-12">
                <div className="md:w-1/2">
                    <img src={isProduct.img} alt={isProduct.alt} />
                </div>
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-semibold mb-3 text-center md:text-start">Classy Modern Smart watch</h1>
                    <div className="flex items-center gap-2 border-secondary_main pb-1 md:mb-5 mb-2">
                        <div className=" flex items-center gap-1">
                            <img src="/assets/icons/star-fill.svg" alt="starfill" className=" h-4 w-4" />
                            <img src="/assets/icons/star-fill.svg" alt="starfill" className=" h-4 w-4" />
                            <img src="/assets/icons/star-fill.svg" alt="starfill" className=" h-4 w-4" />
                            <img src="/assets/icons/star-halffill.svg" alt="starfill" className=" h-4 w-4" />
                            <img src="/assets/icons/starll-lined.svg" alt="starfill" className=" h-4 w-4" />
                        </div>
                        <p className="text-sm text-secondary">(2 Reviews)</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <h3 className="text-xl">$99.00</h3>
                        <h2 className="text-2xl text-secondary_light font-semibold">$79.00</h2>
                    </div>
                    <p className="text-lg text-secondary md:py-5 py-2">I must explain to you how all this mistaken idea of denoun cing ple praising pain was born and I will give you a complete account of the system, and expound the actual teaching.</p>

                    <div className="flex items-center gap-10 md:mb-5 py-2">
                        <div>
                            <p className="text-sm text-secondary">Type</p>
                            <p className="text-base font-semibold">Watch</p>
                        </div>
                        <div>
                            <p className="text-sm text-secondary">Model Number</p>
                            <p className="text-base font-semibold">Model Number</p>
                        </div>
                    </div>

                    <div className="md:mb-5 mb-3">
                        <p className="text-lg font-semibold mb-3">Band Color</p>
                        <div className="flex items-center gap-3">
                            {products.map((product) => (
                                <div key={product.id} onClick={() => setIsProduct(product)} className={`p-0.5 border-2 rounded-full cursor-pointer ${product.id === isProduct.id ? `border-${product.color}` : "border-transparent"}`}>
                                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: product.color }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="md:mb-5 mb-3">
                        <p className="text-lg font-semibold mb-3">Wrist Size</p>
                        <div className="flex items-center gap-3 flex-wrap">
                            {["S", "M", "L", "XL"].map((size) => (
                                <Button key={size} onClick={() => handleSizeSelect(size, size === "S" ? 69 : size === "M" ? 79 : size === "L" ? 89 : 99)} className={`whitespace-nowrap ${isActive.size === size ? "border-secondary_light" : "border-divider"}`}>
                                    <span className={`${isActive.size === size ? "text-secondary_light" : "text-primary"} font-semibold mr-2`}>{size}</span>${size === "S" ? 69 : size === "M" ? 79 : size === "L" ? 89 : 99}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-5 flex items-center justify-center md:justify-start gap-3">
                        <div className="flex items-center">
                            <button onClick={() => handleQuantityChange(-1)} disabled={isCart || count <= 1} className={`px-2 py-1.5 border border-divider rounded-l ${count <= 1 ? "cursor-not-allowed" : "cursor-pointer"}`}>
                                <img src="/assets/icons/minus.svg" alt="minus" className="w-5 h-6" />
                            </button>
                            <div className="px-[1.625rem] py-1.5 w-16 border-t border-b border-divider">{count}</div>
                            <button onClick={() => handleQuantityChange(1)} disabled={isCart} className="px-2 py-1.5 border border-divider rounded-r cursor-pointer">
                                <img src="/assets/icons/plus.svg" alt="plus" className="h-6 w-5" />
                            </button>
                        </div>
                        <Button onClick={() => setIsCart(true)} className="bg-secondary_light border-secondary_light text-white font-semibold">
                            Add to Cart
                        </Button>
                        <img src="/assets/icons/heart.svg" alt="alt" className="h-auto w-auto" />
                    </div>
                </div>
            </div>

            {isCart && (
                <div className="flex items-center justify-center absolute -bottom-20 left-1/2">
                    <Button onClick={handleCheckout} className="bg-warning_main rounded-full font-semibold">
                        Checkout <span className="bg-white py-0.5 px-1.5 ml-2 rounded">{count}</span>
                    </Button>
                </div>
            )}

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40" onClick={handleCloseModal}>
                    <div onClick={(e) => e.stopPropagation()} className="bg-white p-11 rounded-[1.25rem] shadow-lg w-[40.688rem] z-50">
                        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
                        <table className="bg-white rounded-lg min-w-full">
                            <thead>
                                <tr className="text-center border-b border-divider">
                                    <th className="py-1.5 text-sm text-start">Item</th>
                                    <th className="px-4 py-1.5 text-sm">Color</th>
                                    <th className="px-4 py-1.5 text-sm">Size</th>
                                    <th className="px-4 py-1.5 text-sm">Qnt</th>
                                    <th className="pr-1 py-1.5 text-end text-sm">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isData.map((row, index) => (
                                    <tr key={index} className="border-b border-divider text-center">
                                        <td className="py-5 text-sm text-start flex items-center gap-2">
                                            <img src={row.img} alt={row.alt} className="h-9 w-9 rounded" />
                                            {row.name}
                                        </td>
                                        <td className="px-4 py-5 text-sm">{row.colorName}</td>
                                        <td className="px-4 py-5 text-sm font-semibold">{row.size}</td>
                                        <td className="px-4 py-5 text-sm font-semibold">{row.qnt}</td>
                                        <td className="pr-1 py-5 text-end text-sm font-semibold">${row.price}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="pr-1 py-5 font-semibold" colSpan={3}>
                                        Total
                                    </td>
                                    <td className="pr-1 py-5 font-semibold text-center text-sm">{totalQnt}</td>
                                    <td className="pr-1 py-5 font-semibold text-end text-lg">${totalPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex justify-end gap-6 items-center mt-4">
                            <Button onClick={handleCloseModal} className="font-semibold">
                                Continue Shopping
                            </Button>
                            <Button onClick={handleCloseModal} className="bg-secondary_light font-semibold text-white border-secondary_light">
                                Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
