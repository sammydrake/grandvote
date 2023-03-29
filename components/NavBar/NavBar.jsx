import React, { useState, useEffect, useContext } from "react";
import { ContextElection } from "../../context/Blockchain.services";
import { FaUserCheck, FaVoteYea, FaPoll } from "react-icons/fa";
import Link from "next/link";
import { Button } from "../index_1";

const NavBar = () => {
  const { connectWallet, walletAddr, votingChairman } =
    useContext(ContextElection);

  const [itemsArray, setItemsArray] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const initialItemsArray = [
      {
        item: "Home",
        link: "/",
        tag: "general",
      },

      {
        item: "Register",
        link: "enlist-voters",
        tag: "general",
        icon: <FaUserCheck />,
      },
      {
        item: "Vote",
        link: "place-vote",
        tag: "general",
        icon: <FaVoteYea />,
      },
      {
        item: "View Result",
        link: "result",
        tag: "general",
        icon: <FaPoll />,
      },
    ];

    if (
      walletAddr &&
      walletAddr.length > 0 &&
      votingChairman &&
      votingChairman.length > 0 &&
      walletAddr.toLowerCase() === votingChairman.toLowerCase()
    ) {
      initialItemsArray.unshift({
        item: "votingChairman",
        link: "votingChairman",
        tag: "votingChairman",
        icon: <FaUserCheck />,
      });
    }

    setItemsArray(initialItemsArray);
  }, [walletAddr, votingChairman]);

  return (
    <div className="flex items-center justify-between bg-gray-800 py-4 px-6 md:px-12">
      <p className="text-2xl text-gray-100 font-bold">GrandVote</p>
      <div className="flex items-center justify-between bg-gray-800 py-4 px-6 md:px-12">
        <p className="text-2xl text-gray-100 font-bold"></p>

        <div className="hidden md:flex items-center justify-center space-x-4">
          {itemsArray.map((el, i) => (
            <div
              key={i + 1}
              className="flex items-center text-gray-100 font-medium hover:text-white transition-colors duration-300 ease-in-out"
            >
              <Link href={{ pathname: `${el.link}` }}>
                <div className="mr-2">{el.icon}</div>
              </Link>
              <Link href={{ pathname: `${el.link}` }}>{el.item}</Link>
            </div>
          ))}
        </div>

        <div className="md:hidden flex items-center">
          <button
            className="text-gray-100 hover:text-white focus:outline-none"
            type="button"
            onClick={() => setShowMenu(!showMenu)}
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {showMenu && (
          <div className="md:hidden fixed top-0 left-0 h-screen w-1/2 bg-gray-800 py-4 px-6">
            <div className="flex flex-col space-y-4">
              {itemsArray.map((el, i) => (
                <div
                  key={i + 1}
                  className="flex items-center text-gray-100 font-medium hover:text-white transition-colors duration-300 ease-in-out"
                >
                  <Link href={{ pathname: `${el.link}` }}>
                    <div className="mr-2">{el.icon}</div>
                  </Link>
                  <Link href={{ pathname: `${el.link}` }}>{el.item}</Link>
                </div>
              ))}
              <div className="mt-4">
                <Button
                  btnName={
                    walletAddr && walletAddr.length > 0
                      ? "Connected"
                      : "Connect"
                  }
                  handleClick={connectWallet}
                />
              </div>
            </div>
          </div>
        )}

        <div className="hidden md:block">
          <Button
            btnName={
              walletAddr && walletAddr.length > 0 ? "Connected" : "Connect"
            }
            handleClick={connectWallet}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
