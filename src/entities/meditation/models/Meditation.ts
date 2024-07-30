/** Сущность медитации которая возвращается с сервера */
export interface Meditation {
	/** Идентификатор медитации в системе Evolution */
	readonly Id: string;
	/** Натуральный язык на котором получены данные об медитации */
	readonly Language?: string;
	/** Название медитации */
	readonly Name: string;
	/** Описание медитации */
	readonly Description?: string;
	/** Тип медитации */
	readonly TypeMeditation: "Relaxation"
		| "BreathtakingPractice"
		| "DirectionalVisualizations"
		| "DancePsychotechnics"
		| "Set";
	/** Требуется ли подписка, чтобы прослушать данную медитацию */
	readonly IsSubscribed: boolean;
	/** Если ли у данной медитации главная аудиозапись */
	readonly AudioId?: string;
	/** Длина аудиозаписи */
	readonly AudioLength: number;
	//!
	readonly PhotoId?: string;
}