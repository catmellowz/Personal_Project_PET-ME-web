import CardProduct from '../../icons/servicecard.jpeg';
import Cart from '../../icons/cartplus.png';

export default function Card({
  onClick,
  image,
  title,
  description,
  price,
}) {
  return (
    <div className=' w-[250px] h-[450px] bg-orange-50 border border-gray-200 rounded-lg shadow '>
      <div>
        <img
          className='rounded-t-lg h-[200px] w-[250px]'
          src={image || CardProduct}
          alt='cardproduct'
        />
      </div>
      <div className='p-5'>
        <div className='text-center'>
          <p className='mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {title}
          </p>
          <div className='h-[114px]'>
            <p className='text-xs mb-3  '>{description}</p>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='pt-2'>
            <p>THB {price}</p>
          </div>
          <button
            onClick={onClick}
            className='flex justify-center px-3 py-2 bg-orange-500 rounded-lg hover:bg-orange-600'
          >
            <img className='h-6 w-auto' src={Cart} alt='logo' />
          </button>
        </div>
      </div>
    </div>
  );
}
