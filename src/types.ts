// TheMealDB API'sinden dönen tek bir tarif (meal) nesnesi.
// Malzemeler strIngredient1..20 ve strMeasure1..20 olarak geldiği için
// dinamik erişime izin veren bir index signature ekliyoruz.
export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  [key: string]: string | undefined;
}

export interface MealsResponse {
  meals: Meal[] | null;
}

// Kullanıcının kendi eklediği ve localStorage'da tutulan tarif.
export interface CustomRecipe {
  id: string;
  name: string;
  category: string;
  ingredients: string;
  instructions: string;
}
