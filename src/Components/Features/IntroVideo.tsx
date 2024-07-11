const IntroVideo = () => {
  return (
    <>
      <div>
        <iframe
          width="600"
          height="315"
          frameBorder={0}
          src="https://www.youtube.com/embed/yAYKH8NOSlQ?si=eE0P4qLqiu7150vz"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};

export default IntroVideo;
