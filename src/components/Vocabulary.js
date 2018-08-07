export default class Vocabulary
{
	static Texts = {};
	static setText(original, text2)
	{
		Vocabulary.Texts[original] = text2;
	}
	static getText(original)
	{
		return Vocabulary.Texts[original] ? Vocabulary.Texts[original] : original;
	}
	static init(texts)
	{
		for(var key in texts)
		{
			Vocabulary.setText(key, texts[key]);
		}
	}
}