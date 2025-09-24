import congrats from "../assets/images/congrats.png";

function ConfirmationModal({ onClose }) {
  return (
    <div className="absolute w-[100%] h-[100vh] top-0 left-0  bg-white z-50 flex flex-col items-center p-[30px]">
      <div className="flex self-end mb-[44px]">
        <button
          onClick={onClose}
          className="text-[32px] font-medium text-[#10151F] cursor-pointer"
        >
          ✕
        </button>
      </div>

      <img src={congrats} alt="congrats" className="mb-[40px]" />
      <h1 className="font-semibold text-[42px] leading-[100%] tracking-[0%] text-dark-blue mb-[16px]">
        Congrats!
      </h1>
      <p className="mb-[74px] font-normal text-[14px] leading-[100%] tracking-[0%] text-[#3E424A]">
        Your order is placed successfully!
      </p>
      <button
        onClick={onClose}
        className="btn btn-cta w-[214px] h-[41px] text-base-14"
      >
        Continue shopping
      </button>
    </div>
  );
}

export default ConfirmationModal;
