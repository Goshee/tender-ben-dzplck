using UnityEngine;

public enum GlyphType { Bee, Spider, Butterfly }

[RequireComponent(typeof(SpriteRenderer))]
public class Glyph : MonoBehaviour
{
    public GlyphType glyphType;
    public Sprite beeSprite;
    public Sprite spiderSprite;
    public Sprite butterflySprite;

    SpriteRenderer sr;

    void Awake()
    {
        sr = GetComponent<SpriteRenderer>();
        RefreshSprite();
    }

    public void SetType(GlyphType t)
    {
        glyphType = t;
        RefreshSprite();
    }

    void RefreshSprite()
    {
        if (sr == null) sr = GetComponent<SpriteRenderer>();
        switch (glyphType)
        {
            case GlyphType.Bee: sr.sprite = beeSprite; break;
            case GlyphType.Spider: sr.sprite = spiderSprite; break;
            case GlyphType.Butterfly: sr.sprite = butterflySprite; break;
        }
    }

    public string TypeName()
    {
        return glyphType.ToString().ToLower();
    }
}