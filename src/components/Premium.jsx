const Premium = () => {
  return (
    <div className="m-10">
      <div className="flex w-full ">
        <div className="card bg-base-300 rounded-box grid h-100 grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul className="text-xl" type="disc">
            <li>Chat with other people</li>
            <li>100 connection Requests per day</li>
            <li>3 months</li>
          </ul>
          <button className="btn btn-primary bg-amber-50 text-black">
            Buy Now
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-100 grow place-items-center">
          <h1 className="font-bold text-3xl">Golden Membership</h1>
          <ul className="text-xl" type="disc">
            <li>Chat with other people</li>
            <li>No connection Requests limit</li>
            <li>6 months</li>
          </ul>
          <button className="btn btn-primary bg-amber-500">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
