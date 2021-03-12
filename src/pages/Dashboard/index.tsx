import addImg from '../../assets/file-plus.svg';
import listImg from '../../assets/file-text.svg';

export default function Dashboard() {
  return (
    <div className="h-screen w-full bg-gray-200 flex items-center justify-center">
      <div className="w-full flex items-center justify-center p-10">
        <div className="w-1/4 border-2 border-red-500 bg-gray-50 p-4 mr-24 rounded rounded-t-lg flex flex-col items-center">
          <div className="rounded-full w-48 h-48 p-5 flex justify-center border-2 border-gray-300">
            <img src={addImg} alt="Adicionar anúncio" />
          </div>

          <button
            type="button"
            className="text-center bg-red-500 text-gray-50 mt-5 w-full h-10 hover:bg-red-600 duration-200 font-bold"
          >
            Novo anúncio
          </button>
        </div>

        <div className="w-1/4 border-2 border-red-500 bg-gray-50 p-4 rounded rounded-t-lg flex flex-col items-center">
          <div className="rounded-full w-48 h-48 p-5 flex justify-center border-2 border-gray-300">
            <img src={listImg} alt="Adicionar anúncio" />
          </div>

          <button
            type="button"
            className="text-center bg-red-500 text-gray-50 mt-5 w-full h-10 hover:bg-red-600 duration-200 font-bold"
          >
            Pesquisar anúncio
          </button>
        </div>
      </div>
    </div>
  );
}
