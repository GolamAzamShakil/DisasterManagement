"use client";

type Props = {
  onSignOut: () => Promise<void>;
};

const SignOut = ({ onSignOut }: Props) => {
  return (
    <button
      className="cursor-grab"
      onClick={() => {
        onSignOut();
      }}
    >
      Sign Out
    </button>
  );
};

export default SignOut;
