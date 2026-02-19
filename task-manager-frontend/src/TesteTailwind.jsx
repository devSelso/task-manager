export function TesteTailwind() {
  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl">
        <h1 className="text-4xl font-bold text-blue-600">
          SE ISSO ESTIVER AZUL, O TAILWIND FUNCIONA!
        </h1>
        <p className="text-green-600 mt-4">
          E este texto deve estar verde
        </p>
        <div className="bg-purple-500 text-white p-2 mt-4 rounded">
          Este fundo deve ser roxo
        </div>
      </div>
    </div>
  );
}