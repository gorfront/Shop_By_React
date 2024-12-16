const RatingReview: React.FC<{ rating: number }> = ({ rating }) => {
  let key = new Date().getTime();
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <span
            key={++key}
            style={{
              color: rating >= star ? "gold" : "gray",
              fontSize: `25px`,
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default RatingReview;
