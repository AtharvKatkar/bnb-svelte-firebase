export interface Listing {
	id: string;
	title: string;
	description: string;
	createdAt: Date;
	category: string;
	guestCount: string;
	roomCount: string;
	bathroomCount: string;
	userId: string;
	imgSrc: string;
	location: string;
	price: number;
}

export interface Reservations {
	endData: Date;
	guest: number;
	listingId: string;
	reservedAt: Date;
	startDate: string;
	totalPrice: number;
	userId: string;
}
