import i18n from "../../app/I18n";

export const ruPluralization  = (count: number) => {
	const module10 = count % 10;
	const module100 = count % 100;
	let key;
	const zero = count === 0;
	const one = module10 === 1 && module100 !== 11;
	const few = [2, 3, 4].includes(module10) && ![12, 13, 14].includes(module100);
	const many =
		module10 === 0 ||
		[5, 6, 7, 8, 9].includes(module10) ||
		[11, 12, 13, 14].includes(module100);

	if (zero) {
		key = "zero";
	} else if (one) {
		key = "one";
	} else if (few) {
		key = "few";
	} else if (many) {
		key = "many";
	} else {
		key = "other";
	}
	return [key];
}
