import ProductForm from "./components/ProductForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        
        <h1 className="text-4xl font-bold text-center mb-8">
          CRUD Productos
        </h1>

        <ProductForm
          onCreated={() => {}}
        />
      </div>
    </div>
  );
}

export default App;