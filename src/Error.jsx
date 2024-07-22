function Error() {
  return (
    <div className="flex flex-col items-center justify-center size-3/4">
      <p className="text-sm sm:text-2xl text-red-400">{"I'm not creative enough right now, try later"}</p>
      <img src="/error.webp" alt="error" className="object-contain size-4/5 aspect-square" />
    </div>
  );
}

export default Error;
