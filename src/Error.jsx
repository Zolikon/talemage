function Error() {
  return (
    <div className="flex flex-col items-center justify-center w-4/5 h-4/5 md:w-1/2 md:h-1/2 xl:w-1/3 xl:h-1/3">
      <p className="text-2xl text-red-400">{"I'm not creative enough right now, try later"}</p>
      <img src="/error.webp" alt="error" />
    </div>
  );
}

export default Error;
