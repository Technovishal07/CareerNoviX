import React from "react";

const ExploreCompany = () => {
  const cards = [
    {
      title: "Career With Us",
      description: "Join our innovative team and grow your career in tech",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
    {
      title: "Our Expert Team",
      description: "Serving diverse sectors with cutting-edge solutions",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    },
    {
      title: "Our Event",
      description: "Join our seminars, webinars, and workshops",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865",
    },
  ];

  return (
    <section className="explore-section">
      <div className="container">
        <div className="heading">
          <h1>Explore CareerNova Company</h1>
          <p>
            Discover opportunities, industries we serve, and comprehensive
            services we offer
          </p>
        </div>

        <div className="card-container">
          {cards.map((card, index) => (
            <div className="card" key={index}>
              <div
                className="card-image"
                style={{ backgroundImage: `url(${card.image})` }}
              >
                <div className="overlay">
                  <h3>{card.title}</h3>
                </div>
              </div>

              <div className="card-content">
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreCompany;