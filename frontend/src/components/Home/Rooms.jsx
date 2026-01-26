const Rooms = () => {
  return (
    <div>
      <h1 className='flex justify-center items-center text-3xl p-1 my-2'>Room Types</h1>
      <section className='pt-5 lg:pt-8 pb-5 lg:pb-8 h-full bg-[#F3F4F6]'>
        <div className='container grid sm:grid-cols-2 lg:grid-cols-3 gap-12 my-3'>
          {/* Room cards will be rendered here when data is available */}
        </div>
      </section>
    </div>
  );
};

export default Rooms;
