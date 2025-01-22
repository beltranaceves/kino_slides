import SlidesEditor from '../components/slide_editor/SlidesEditor'

export default function New({ handleRouteChange }) {
  return (
    <div className="w-full h-full min-w-[320px] p-4">
      <div className="w-full h-full">
        <SlidesEditor />
      </div>
      <button
        onClick={() => handleRouteChange('edit')}
        className="mt-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
      >
        Go to Edit
      </button>
      <button
        onClick={() => handleRouteChange('sample')}
        className="mt-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
      >
        Go to Sample
      </button>
    </div>
  )
}
