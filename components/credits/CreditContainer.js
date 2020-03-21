import Link from "next/link";

const CreditContainer = ({ cur }) => {
	return (
		<Link href={`/person/detail/[sid]`} as={`/person/detail/${cur.id}`}>
			<a className="credit-link">
				<div key={cur.id} className="credit-container">
					<div className="credit-img-container">
						<img
							className="credit-img"
							src={
								cur.profile_path ? (
									`https://image.tmdb.org/t/p/w200${cur.profile_path}`
								) : cur.gender === 1 ? (
									"/empty-profile/empty-profile-picture-woman-arranged.jpg"
								) : (
									"/empty-profile/empty-profile-picture-man-arranged.jpg"
								)
							}
							alt={`${cur.name} Profile Image`}
						/>
					</div>
					<span className="credit-name">{cur.name}</span>
					{cur.character && <span className="credit-character-name">({cur.character})</span>}
					{cur.job && <span className="credit-character-name">({cur.job})</span>}
				</div>
				<style jsx>{`
					.credit-link {
						text-decoration: none;
						color: white;
					}

					.credit-container {
						width: 90%;
						height: 90%;
						display: flex;
						flex-direction: column;
						align-items: center;
						margin: 1rem auto;
						text-align: center;
					}

					.credit-img-container {
						height: 80%;
						margin-bottom: 2rem;
					}

					.credit-img {
						width: 100%;
						height: 100%;
						border-radius: 60px;
						transition: all 400ms ease;
					}

					.credit-link:hover .credit-img {
						filter: brightness(0.8);
					}

					.credit-name {
						font-size: 1.7rem;
					}

					.credit-character-name {
						font-size: 1.3rem;
					}
				`}</style>
			</a>
		</Link>
	);
};

export default CreditContainer;
