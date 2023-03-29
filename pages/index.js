const Header = () => {
  return (
    <div className="relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
      <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
        <svg
          className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
          viewBox="0 0 100 100"
          fill="currentColor"
          preserveAspectRatio="none slice"
        >
          <path d="M50 0H100L50 100H0L50 0Z" />
        </svg>
        <img
          className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
          src="https://images.idgesg.net/images/article/2019/08/election_2016_teaser_16_electronic_voting_evoting_security-100807007-large.jpg?auto=webp&quality=85,70"
          alt=""
        />
      </div>
      <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
        <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
          <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            Grandvote voting system
            <br className="hidden md:block" />
            has come{" "}
            <span className="inline-block text-deep-purple-accent-400">
              to stay
            </span>
          </h2>
          <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
            Grandvote Blockchain voting is a new way of conducting elections
            using the technology behind cryptocurrencies like Bitcoin. It offers
            advantages such as increased transparency, security, and
            accessibility for voters. By using a decentralized and immutable
            ledger, blockchain voting eliminates the need for a central
            authority, making it more difficult for malicious actors to tamper
            with the results. Voters can cast their votes securely and remotely
            using a digital wallet, ensuring that their vote is counted
            accurately and anonymously. While there are still challenges and
            concerns to be addressed, blockchain voting has the potential to
            revolutionize the way we think about democratic processes.
          </p>
          <div className="flex items-center"></div>
        </div>
      </div>
    </div>
  );
};
export default Header;
