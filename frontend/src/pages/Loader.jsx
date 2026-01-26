import { PuffLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className='wrapper flexCenter' style={{ height: '60vh' }}>
      <PuffLoader height='80' width='80' radius={1} color='#4066ff' aria-label='puff-loading' />
    </div>
  );
};

export default Loader;
