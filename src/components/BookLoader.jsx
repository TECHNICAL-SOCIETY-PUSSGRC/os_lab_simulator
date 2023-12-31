import { BookLoader } from "react-awesome-loaders-py3";

const BookLoaderComponent = () => {
    return (
      <div className="mb-10">
        <BookLoader
          background={"linear-gradient(135deg, #6066FA, #4645F6)"}
          desktopSize={"50px"}
          mobileSize={"30px"}
          textColor={"#4645F6"}
        />
      </div>
    );
  };

export default BookLoaderComponent