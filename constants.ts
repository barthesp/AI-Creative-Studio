import { Angle, Style, Emotion } from './types';

export const CAMERA_ANGLES: Angle[] = [
    { 
        id: "aerial_shot", 
        name: "Vue Aérienne", 
        description: "Generate an aerial shot of the main subject from directly above.", 
        enhancedDescription: "une image ou un dessin d'un lieu vu du dessus, comme si l'on regardait depuis le ciel" 
    },
    { 
        id: "drone_shot", 
        name: "Vue Drone", 
        description: "Generate a dynamic shot as if taken from a moving drone.", 
        enhancedDescription: "Generate a shot from a drone positioned high above the subject. The camera must be looking vertically down at the ground, creating a stabilized top-down view." 
    },
    { 
        id: "face_zoom", 
        name: "Zoom sur le Visage", 
        description: "Generate a close-up shot focusing on the main subject's face.", 
        enhancedDescription: "Generate an intense close-up on the subject's face, capturing subtle expressions and emotions with sharp focus and a shallow depth of field." 
    },
    { 
        id: "eye_zoom_shot", 
        name: "Zoom sur les Yeux", 
        description: "Generate an extreme close-up shot focusing on the main subject's eyes.", 
        enhancedDescription: "Generate an intense and dramatic extreme close-up focusing only on the subject's eyes, capturing every intricate detail, reflection, and emotion with sharp, macro-like focus." 
    },
    { 
        id: "low_angle_shot", 
        name: "Contre-plongée", 
        description: "Generate a shot from a low angle, looking up at the subject.", 
        enhancedDescription: "la camera est au sol et l'objectif est pointé vers le haut" 
    },
    { 
        id: "worms_eye_shot", 
        name: "Vue de Ver", 
        description: "Generate an extreme low angle shot, as if from the ground.", 
        enhancedDescription: "Generate an extreme worm's-eye view, taken from ground level looking straight up, creating a sense of extreme height and disorientation." 
    },
    { 
        id: "ground_level_shot", 
        name: "Plan au Ras du Sol", 
        description: "Generate a shot with the camera placed at ground level.", 
        enhancedDescription: "Générez une image en utilisant la technique du plan au ras du sol : l'appareil photo est positionné très près du sol pour créer une perspective inhabituelle et immersive. Cette approche doit changer le point de vue habituel, accentuer les perspectives, mettre en valeur les textures du sol et déformer l'échelle des éléments pour un rendu original et inattendu." 
    },
    { 
        id: "depth_of_field_shot", 
        name: "Profondeur de Champ", 
        description: "Generate a shot with a shallow depth of field, blurring the background.", 
        enhancedDescription: "Generate a shot with a very shallow depth of field, isolating the subject in crisp focus while beautifully blurring the foreground and background elements." 
    },
    { 
        id: "high_angle_shot", 
        name: "Plongée", 
        description: "Generate a shot from a high angle, looking down at the subject.", 
        enhancedDescription: "La caméra est positionnée au-dessus du personnage et l'objectif regarde vers le bas." 
    },
    { 
        id: "panoramic_shot", 
        name: "Panoramique", 
        description: "Generate a wide panoramic shot of the scene.", 
        enhancedDescription: "Generate an expansive panoramic shot, capturing a wide, sweeping vista of the scene, emphasizing the vastness of the environment." 
    },
    { 
        id: "extreme_close_up", 
        name: "Très Gros Plan", 
        description: "Generate an extreme close-up, focusing on a specific detail.", 
        enhancedDescription: "Generate an extreme close-up, tightly framing a single detail of the subject, such as their eyes or hands, to create intimacy or tension." 
    },
    { 
        id: "birds_eye_view", 
        name: "Vue d'Oiseau", 
        description: "Generate a shot directly overhead, like a bird's eye view.", 
        enhancedDescription: "Generate a top-down bird's-eye view, looking directly down on the scene, creating a graphic, map-like quality that reveals patterns and relationships." 
    },
    { 
        id: "side_right_profile", 
        name: "Profil Droit", 
        description: "Generate a shot of the subject's right profile.", 
        enhancedDescription: "Generate a classic side profile shot from the right, clearly outlining the subject's features against the background." 
    },
    { 
        id: "side_left_profile", 
        name: "Profil Gauche", 
        description: "Generate a shot of the subject's left profile.", 
        enhancedDescription: "Generate a classic side profile shot from the left, clearly outlining the subject's features against the background." 
    },
    { 
        id: "shot_from_behind", 
        name: "Vue de Derrière", 
        description: "Generate a shot from directly behind the main subject.", 
        enhancedDescription: "Generate a shot from directly behind the subject, focusing on their perspective and what they are looking at, creating a sense of mystery or anticipation." 
    },
    { 
        id: "close_up_shot", 
        name: "Gros Plan", 
        description: "Generate a close-up shot of the subject.", 
        enhancedDescription: "Generate a compelling close-up shot that tightly frames the subject's face or a key object, drawing the viewer's full attention to it." 
    },
    { 
        id: "portrait_shot", 
        name: "Portrait", 
        description: "Generate a classic portrait shot of the subject.", 
        enhancedDescription: "Generate a beautifully lit and composed portrait shot, capturing the personality and mood of the subject in a timeless style." 
    },
    { 
        id: "extreme_wide_shot", 
        name: "Plan Très Large", 
        description: "Generate an extreme wide shot showing the subject in a vast environment.", 
        enhancedDescription: "Generate a breathtaking extreme wide shot where the subject is very small in a vast landscape, emphasizing their isolation or the scale of their surroundings." 
    },
    { 
        id: "wide_shot", 
        name: "Plan Large", 
        description: "Generate a wide shot that shows the subject and their immediate environment.", 
        enhancedDescription: "Generate a well-balanced wide shot (or long shot) that shows the full subject from head to toe and provides context about their location and actions." 
    },
    { 
        id: "full_shot", 
        name: "Plan d'Ensemble", 
        description: "Generate a full shot capturing the entire subject from head to toe.", 
        enhancedDescription: "Generate a clear full shot that frames the entire body of the subject from head to toe, ideal for showing action or costume." 
    }
];

export const IMAGE_STYLES: Style[] = [
    { id: "none", name: "Aucun Style", prompt: "" },
    { id: "cinematic", name: "Cinématique", prompt: "Recreate the image in a cinematic style, emphasizing dramatic lighting, deep shadows, and a filmic color grade." },
    { id: "photorealistic", name: "Photoréaliste", prompt: "Recreate the image with extreme photorealism. It should look like a high-resolution 8k photograph with intricate details and realistic textures." },
    { id: "anime", name: "Anime", prompt: "Transform the image into a vibrant anime art style, with expressive characters, bold outlines, and saturated colors typical of Japanese animation." },
    { id: "ghibli_style", name: "Style Studio Ghibli", prompt: "Transform the image into the beautiful, hand-painted anime style of Studio Ghibli, featuring lush, detailed backgrounds, soft colors, and a sense of wonder." },
    { id: "cartoon", name: "Dessin Animé (Générique)", prompt: "Recreate the image in a playful and fun cartoon style, with bold outlines, simplified shapes, and bright, cheerful colors." },
    { id: "pixar_style", name: "Dessin Animé Style Pixar", prompt: "Transform the image into the 3D animated style of Pixar movies, with detailed textures, expressive characters, and cinematic lighting." },
    { id: "disney_style", name: "Dessin Animé Style Disney", prompt: "Recreate the image in the classic 2D animated style of Disney, with smooth lines, vibrant colors, and charming character designs." },
    { id: "watercolor", name: "Aquarelle", prompt: "Recreate the image as a delicate watercolor painting, with soft washes of color, visible brush strokes, and a textured paper effect." },
    { id: "oil_painting", name: "Peinture à l'Huile", prompt: "Recreate the image as a classic oil painting, with rich textures, visible impasto brushwork, and the deep colors of traditional oil on canvas." },
    { id: "chinese_ink", name: "Encre de Chine", prompt: "Recreate the image in a traditional Chinese ink wash painting style (Shuimohua), with expressive, minimalist brushstrokes, and a focus on black ink on paper." },
    { id: "impressionist", name: "Impressionniste", prompt: "Recreate the image in an impressionist style, with visible brushstrokes, emphasis on light and its changing qualities, and ordinary subject matter." },
    { id: "surrealist", name: "Surréaliste", prompt: "Transform the image into a surrealist masterpiece, with dream-like, bizarre, and unexpected juxtapositions of elements." },
    { id: "steampunk", name: "Steampunk", prompt: "Reimagine the image in a steampunk aesthetic, featuring retrofuturistic technology, steam-powered machinery, and Victorian-era design elements." },
    { id: "cyberpunk", name: "Cyberpunk", prompt: "Convert the image into a cyberpunk scene, characterized by neon lights, futuristic cityscapes, advanced technology, and a dystopian atmosphere." },
    { id: "pixel_art", name: "Pixel Art", prompt: "Recreate the image as 16-bit pixel art, with a limited color palette and a blocky, retro video game aesthetic." },
    { id: "comic_book_american", name: "Bande Dessinée (Américain)", prompt: "Recreate the image in a classic American comic book style, with bold inks, dynamic action lines, and halftone dot patterns (Ben-Day dots)." },
    { id: "comic_book_manga", name: "Bande Dessinée (Manga N&B)", prompt: "Recreate the image in a black and white manga style, with clean lines, dynamic paneling, expressive characters, and screentone shading." },
    { id: "comic_book_franco_belgian", name: "Bande Dessinée (Franco-Belge)", prompt: "Recreate the image in the 'Ligne Claire' Franco-Belgian comic style, with clear, strong lines of uniform thickness, no hatching, and strong colors." },
    { id: "low_poly", name: "Low Poly", prompt: "Recreate the image in a low poly style, using a mesh of polygonal shapes to create a stylized, geometric, and modern 3D look." },
    { id: "origami", name: "Origami", prompt: "Transform the image into an intricate origami sculpture, with folded paper textures, sharp creases, and a delicate, handcrafted appearance." },
    { id: "synthwave", name: "Synthwave", prompt: "Reimagine the image in a synthwave or retrowave style, featuring a 1980s aesthetic with neon grids, sunset gradients, and retro-futuristic elements." }
];

// 😃 ÉMOTIONS POSITIVES
export const EMOTIONS: Emotion[] = [
    // Joie / Bonheur
    { id: 'joy_smiling', name: 'Sourire (Joie)', prompt: 'Regenerate the image to show the subject with a smiling expression of joy.' },
    { id: 'joy_happy', name: 'Heureux / Contente', prompt: 'Regenerate the image to show the subject with a happy expression.' },
    { id: 'joy_cheerful', name: 'Joyeux', prompt: 'Regenerate the image to show the subject with a cheerful expression.' },
    { id: 'joy_delighted', name: 'Ravi', prompt: 'Regenerate the image to show the subject with a delighted expression.' },
    { id: 'joy_laughing', name: 'Riant / Éclat de rire', prompt: 'Regenerate the image to show the subject laughing heartily.' },
    { id: 'joy_amused', name: 'Amusé', prompt: 'Regenerate the image to show the subject with an amused expression.' },
    { id: 'joy_satisfied', name: 'Satisfait', prompt: 'Regenerate the image to show the subject with a satisfied expression.' },
    { id: 'joy_radiant', name: 'Rayonnant', prompt: 'Regenerate the image to show the subject with a radiant, beaming expression.' },
    { id: 'joy_euphoric', name: 'Euphorique', prompt: 'Regenerate the image to show the subject with a euphoric expression.' },
    { id: 'joy_proud_smile', name: 'Sourire Fier', prompt: 'Regenerate the image to show the subject with a proud smile.' },
    // Sérénité / Calme
    { id: 'serenity_relaxed', name: 'Détendu', prompt: 'Regenerate the image to show the subject with a relaxed expression.' },
    { id: 'serenity_peaceful', name: 'Paisible', prompt: 'Regenerate the image to show the subject with a peaceful expression.' },
    { id: 'serenity_serene', name: 'Serein', prompt: 'Regenerate the image to show the subject with a serene expression.' },
    { id: 'serenity_dreamy', name: 'Rêveur', prompt: 'Regenerate the image to show the subject with a dreamy expression.' },
    { id: 'serenity_gentle_smile', name: 'Doux Sourire', prompt: 'Regenerate the image to show the subject with a gentle smile.' },
    { id: 'serenity_tranquil', name: 'Tranquille', prompt: 'Regenerate the image to show the subject with a tranquil expression.' },
    { id: 'serenity_content', name: 'Apaisé', prompt: 'Regenerate the image to show the subject with a content expression.' },
    // 😢 ÉMOTIONS NÉGATIVES
    // Tristesse
    { id: 'sadness_sad', name: 'Triste', prompt: 'Regenerate the image to show the subject with a sad expression.' },
    { id: 'sadness_tearful', name: 'Larmes aux yeux', prompt: 'Regenerate the image to show the subject with tearful eyes.' },
    { id: 'sadness_crying', name: 'Pleurant', prompt: 'Regenerate the image to show the subject crying.' },
    { id: 'sadness_melancholic', name: 'Mélancolique', prompt: 'Regenerate the image to show the subject with a melancholic expression.' },
    { id: 'sadness_devastated', name: 'Dévasté', prompt: 'Regenerate the image to show the subject with a devastated expression.' },
    { id: 'sadness_grief', name: 'Chagrin', prompt: 'Regenerate the image to show the subject expressing grief.' },
    { id: 'sadness_sorrowful', name: 'Peiné', prompt: 'Regenerate the image to show the subject with a sorrowful expression.' },
    { id: 'sadness_downcast', name: 'Abattu', prompt: 'Regenerate the image to show the subject with a downcast expression.' },
    // Peur / Angoisse
    { id: 'fear_scared', name: 'Effrayé', prompt: 'Regenerate the image to show the subject with a scared expression.' },
    { id: 'fear_terrified', name: 'Terrifié', prompt: 'Regenerate the image to show the subject with a terrified expression.' },
    { id: 'fear_anxious', name: 'Anxieux', prompt: 'Regenerate the image to show the subject with an anxious expression.' },
    { id: 'fear_nervous', name: 'Nerveux', prompt: 'Regenerate the image to show the subject with a nervous expression.' },
    { id: 'fear_panicked', name: 'Paniqué', prompt: 'Regenerate the image to show the subject with a panicked expression.' },
    { id: 'fear_horrified', name: 'Horrifié', prompt: 'Regenerate the image to show the subject with a horrified expression.' },
    { id: 'fear_shocked', name: 'Choqué (Peur)', prompt: 'Regenerate the image to show the subject with a shocked expression of fear.' },
    { id: 'fear_startled', name: 'Sursauté', prompt: 'Regenerate the image to show the subject startled.' },
    { id: 'fear_trembling', name: 'Tremblant', prompt: 'Regenerate the image to show the subject trembling with fear.' },
    // Colère
    { id: 'anger_angry', name: 'En colère', prompt: 'Regenerate the image to show the subject with an angry expression.' },
    { id: 'anger_furious', name: 'Furieux', prompt: 'Regenerate the image to show the subject with a furious expression.' },
    { id: 'anger_irritated', name: 'Irrité', prompt: 'Regenerate the image to show the subject with an irritated expression.' },
    { id: 'anger_outraged', name: 'Indigné', prompt: 'Regenerate the image to show the subject with an outraged expression.' },
    { id: 'anger_aggressive', name: 'Agressif', prompt: 'Regenerate the image to show the subject with an aggressive expression.' },
    { id: 'anger_frowning', name: 'Fronçant les sourcils', prompt: 'Regenerate the image to show the subject frowning in anger.' },
    { id: 'anger_scowling', name: 'Regard noir', prompt: 'Regenerate the image to show the subject scowling.' },
    { id: 'anger_clenched_jaw', name: 'Mâchoire serrée', prompt: 'Regenerate the image to show the subject with a clenched jaw from anger.' },
    // 😯 ÉMOTIONS NEUTRES OU INTENSES
    // Surprise
    { id: 'surprise_surprised', name: 'Surpris', prompt: 'Regenerate the image to show the subject with a surprised expression.' },
    { id: 'surprise_astonished', name: 'Stupéfait', prompt: 'Regenerate the image to show the subject with an astonished expression.' },
    { id: 'surprise_amazed', name: 'Ébahi', prompt: 'Regenerate the image to show the subject with an amazed expression.' },
    { id: 'surprise_shocked', name: 'Choqué (Surprise)', prompt: 'Regenerate the image to show the subject with a shocked expression of surprise.' },
    { id: 'surprise_wide_eyes', name: 'Yeux écarquillés', prompt: 'Regenerate the image to show the subject with wide eyes in surprise.' },
    { id: 'surprise_mouth_open', name: 'Bouche ouverte', prompt: 'Regenerate the image to show the subject with an open mouth in surprise.' },
    // Dégout
    { id: 'disgust_disgusted', name: 'Dégoûté', prompt: 'Regenerate the image to show the subject with a disgusted expression.' },
    { id: 'disgust_repulsed', name: 'Révulsé', prompt: 'Regenerate the image to show the subject with a repulsed expression.' },
    { id: 'disgust_grimacing', name: 'Grimaçant', prompt: 'Regenerate the image to show the subject grimacing in disgust.' },
    { id: 'disgust_sneering', name: 'Rictus', prompt: 'Regenerate the image to show the subject sneering in disgust.' },
    { id: 'disgust_nauseated', name: 'Écœuré', prompt: 'Regenerate the image to show the subject with a nauseated expression.' },
    // Mépris / Doute
    { id: 'contempt_skeptical', name: 'Sceptique', prompt: 'Regenerate the image to show the subject with a skeptical expression.' },
    { id: 'contempt_doubtful', name: 'Dubitatif', prompt: 'Regenerate the image to show the subject with a doubtful expression.' },
    { id: 'contempt_smirk', name: 'Sourire en coin', prompt: 'Regenerate the image to show the subject with a smirk of contempt.' },
    { id: 'contempt_sarcastic', name: 'Moqueur', prompt: 'Regenerate the image to show the subject with a sarcastic expression.' },
    { id: 'contempt_contemptuous', name: 'Méprisant', prompt: 'Regenerate the image to show the subject with a contemptuous expression.' },
    // 💞 ÉMOTIONS SOCIALES / RELATIONNELLES
    // Amour / Tendresse
    { id: 'love_loving', name: 'Aimant', prompt: 'Regenerate the image to show the subject with a loving expression.' },
    { id: 'love_affectionate', name: 'Affectueux', prompt: 'Regenerate the image to show the subject with an affectionate expression.' },
    { id: 'love_adoring', name: 'Admiratif', prompt: 'Regenerate the image to show the subject with an adoring expression.' },
    { id: 'love_flirty', name: 'Séducteur', prompt: 'Regenerate the image to show the subject with a flirty expression.' },
    { id: 'love_passionate', name: 'Passionné', prompt: 'Regenerate the image to show the subject with a passionate expression.' },
    { id: 'love_tender', name: 'Tendre', prompt: 'Regenerate the image to show the subject with a tender expression.' },
    { id: 'love_caring', name: 'Bienveillant', prompt: 'Regenerate the image to show the subject with a caring expression.' },
    // Empathie / Compassion
    { id: 'empathy_compassionate', name: 'Compatissant', prompt: 'Regenerate the image to show the subject with a compassionate expression.' },
    { id: 'empathy_concerned', name: 'Préoccupé', prompt: 'Regenerate the image to show the subject with a concerned expression for someone.' },
    { id: 'empathy_soft_gaze', name: 'Regard doux', prompt: 'Regenerate the image to show the subject with a soft, empathetic gaze.' },
    { id: 'empathy_comforting', name: 'Réconfortant', prompt: 'Regenerate the image to show the subject with a comforting expression.' },
    // 🧠 ÉTATS INTÉRIEURS COMPLEXES
    // Concentration / Réflexion
    { id: 'focus_focused', name: 'Concentré', prompt: 'Regenerate the image to show the subject with a focused expression.' },
    { id: 'focus_thoughtful', name: 'Pensif', prompt: 'Regenerate the image to show the subject with a thoughtful expression.' },
    { id: 'focus_curious', name: 'Curieux', prompt: 'Regenerate the image to show the subject with a curious expression.' },
    { id: 'focus_observing', name: 'Observateur', prompt: 'Regenerate the image to show the subject observing something intently.' },
    { id: 'focus_analyzing', name: 'Analytique', prompt: 'Regenerate the image to show the subject with an analytical expression.' },
    { id: 'focus_meditative', name: 'Méditatif', prompt: 'Regenerate the image to show the subject with a meditative expression.' },
    // Fatigue / Lassitude
    { id: 'fatigue_tired', name: 'Fatigué', prompt: 'Regenerate the image to show the subject with a tired expression.' },
    { id: 'fatigue_exhausted', name: 'Épuisé', prompt: 'Regenerate the image to show the subject with an exhausted expression.' },
    { id: 'fatigue_sleepy', name: 'Endormi', prompt: 'Regenerate the image to show the subject looking sleepy.' },
    { id: 'fatigue_bored', name: 'Ennuyé', prompt: 'Regenerate the image to show the subject with a bored expression.' },
    { id: 'fatigue_resigned', name: 'Résigné', prompt: 'Regenerate the image to show the subject with a resigned expression.' },
    // 😈 EXPRESSIONS SPÉCIFIQUES
    { id: 'specific_sinister_grin', name: 'Sourire maléfique', prompt: 'Regenerate the image to show the subject with a sinister grin.' },
    { id: 'specific_evil_smile', name: 'Sourire démoniaque', prompt: 'Regenerate the image to show the subject with an evil smile.' },
    { id: 'specific_manic_laughter', name: 'Rire hystérique', prompt: 'Regenerate the image to show the subject with manic laughter.' },
    { id: 'specific_crying_with_joy', name: 'Pleurs de joie', prompt: 'Regenerate the image to show the subject crying with joy.' },
    { id: 'specific_silent_scream', name: 'Cri silencieux', prompt: 'Regenerate the image to show the subject with a silent scream.' },
    { id: 'specific_fear_and_awe', name: 'Peur et admiration', prompt: 'Regenerate the image to show the subject with an expression of fear and awe.' },
    { id: 'specific_intense_stare', name: 'Regard intense', prompt: 'Regenerate the image to show the subject with an intense stare.' },
    { id: 'specific_rage_scream', name: 'Cri de rage', prompt: 'Regenerate the image to show the subject with a rage scream.' },
    { id: 'specific_smirk_of_triumph', name: 'Sourire de triomphe', prompt: 'Regenerate the image to show the subject with a smirk of triumph.' },
    { id: 'specific_trembling_lips', name: 'Lèvres tremblantes', prompt: 'Regenerate the image to show the subject with trembling lips.' },
    { id: 'specific_eyes_full_of_tears', name: 'Yeux pleins de larmes', prompt: 'Regenerate the image to show the subject with eyes full of tears.' },
    { id: 'specific_subtle_sadness', name: 'Tristesse discrète', prompt: 'Regenerate the image to show the subject with an expression of subtle sadness.' },
    { id: 'specific_fake_smile', name: 'Faux sourire', prompt: 'Regenerate the image to show the subject with a fake smile.' },
    { id: 'specific_longing_gaze', name: 'Regard nostalgique', prompt: 'Regenerate the image to show the subject with a longing gaze.' },
];


export const CREATIVE_MODE_PROMPT = "The AI is now in creative mode. It should prioritize artistic interpretation, imagination, and surprise over strict adherence to the original image. Feel free to introduce new elements, change the environment, and transform the subject in unexpected ways to create a truly unique and imaginative piece of art.";

export const FIDELITY_PROMPT = "INSTRUCTION FONDAMENTALE : Ta mission est de régénérer l'image fournie en appliquant un nouvel angle de caméra et un nouveau style artistique, tout en garantissant une fidélité ABSOLUE au contenu original. Les personnages, les objets et l'environnement de base doivent rester parfaitement identiques et reconnaissables. Le style doit être appliqué de manière cohérente sur l'ensemble de l'image. N'ajoute, ne supprime et n'altère aucun élément constitutif du sujet principal. La cohérence avec l'image source est la priorité absolue.";