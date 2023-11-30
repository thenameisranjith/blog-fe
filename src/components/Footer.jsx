const Footer = () => {
  return (
    <>
      <div
        className="mt-1 w-full bg-black px-8 md:px-[300px] flex md:flex-row flex-col space-y-6 md:space-y-0 items-start md:justify-between text-sm md:text-md py-4"
        style={{ position: "fixed", bottom: "0px" }}
      >
        <div className="flex flex-col text-white">
          <p>Featured Blogs</p>
          <p>Most viewed</p>
          <p>Readers Choice</p>
        </div>

        <div className="flex flex-col text-white">
          <p>Forum</p>
          <p>Support</p>
          <p>Recent Posts</p>
        </div>

        <div className="flex flex-col text-white">
          <p>Privacy Policy</p>
          <p>About Us</p>
          <p>Terms & Conditions</p>
          <p>Terms of Service</p>
        </div>
      </div>
      <p
        style={{
          position: "fixed",
          bottom: "0px",
          textAlign: "center",
          color: "white",
        }}
      >
        All rights reserved @Blog Market 2023
      </p>
    </>
  );
};

export default Footer;
