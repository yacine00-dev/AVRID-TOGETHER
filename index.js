// Script pour faire disparaître la navbar au défilement
let prevScrollpos = window.pageYOffset;
const navbar = document.querySelector('header');

window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        navbar.style.top = "0"; // Afficher la navbar en haut
    } else {
        navbar.style.top = "-80px"; // Cacher la navbar quand on défile vers le bas
    }
    prevScrollpos = currentScrollPos;
};

// Fonction pour afficher les détails d'une fonctionnalité
function expandFeature(featureElement) {
    // Flouter le fond
    document.body.classList.add('blur-background');

    // Créer un conteneur pour les détails si nécessaire
    let detailsContainer = featureElement.querySelector('.feature-details');
    if (!detailsContainer) {
        detailsContainer = document.createElement('div');
        detailsContainer.classList.add('feature-details');

        // Ajouter du texte de détail
        const detailText = document.createElement('p');
        detailText.innerText = getFeatureDetails(featureElement); // Appel à la fonction pour obtenir le texte détaillé
        detailsContainer.appendChild(detailText);

        // Ajouter une image spécifique à la fonctionnalité
        const detailImage = document.createElement('img');
        detailImage.src = getFeatureImage(featureElement); // Appel à la fonction pour obtenir l'image
        detailImage.alt = "Image de la fonctionnalité";
        detailImage.classList.add('detail-image');
        detailsContainer.appendChild(detailImage);

        // Ajouter un bouton pour fermer
        const closeButton = document.createElement('button');
        closeButton.innerText = "Fermer";
        closeButton.classList.add('close-button');
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            closeFeature(featureElement, closeButton);
        });

        detailsContainer.appendChild(closeButton);

        // Ajouter les détails à la feature
        featureElement.appendChild(detailsContainer);
    }
}

// Fonction pour obtenir le texte de détail en fonction de la fonctionnalité
function getFeatureDetails(featureElement) {
    switch (featureElement.querySelector('h3').innerText) {
        case 'Covoiturage rapide et facile':
            return "Trouvez un covoiturage en quelques secondes grâce à notre algorithme optimisé pour la rapidité et la précision.";
        case 'Rencontres sécurisées':
            return "Chaque utilisateur est vérifié pour garantir votre sécurité pendant vos trajets partagés.";
        case 'Notifications en temps réel':
            return "Restez informé en temps réel sur vos trajets, covoiturages et changements d'horaires.";
        case 'Paiement sécurisé':
            return "Notre système de paiement intégré garantit des transactions sûres et rapides directement depuis votre smartphone.";
        default:
            return "Description de la fonctionnalité.";
    }
}

// Fonction pour obtenir l'image de détail en fonction de la fonctionnalité
function getFeatureImage(featureElement) {
    switch (featureElement.querySelector('h3').innerText) {
        case 'Covoiturage rapide et facile':
            return "assets/img/imgrecherche.svg"; // Remplace par le bon chemin vers l'image
        case 'Rencontres sécurisées':
            return "assets/img/pop up.svg"; // Remplace par le bon chemin vers l'image
        case 'Notifications en temps réel':
            return "assets/img/paiment.svg"; // Remplace par le bon chemin vers l'image
        case 'Paiement sécurisé':
            return "assets/img/pay.svg"; // Remplace par le bon chemin vers l'image
        default:
            return "assets/img/default-image.jpg"; // Image par défaut si pas trouvé
    }
}

// Fonction pour fermer la fonctionnalité et enlever les détails
function closeFeature(featureElement, closeButton) {
    featureElement.classList.remove('expanded');
    document.body.classList.remove('blur-background');
    const detailsContainer = featureElement.querySelector('.feature-details');
    if (detailsContainer) {
        detailsContainer.remove();
    }
}

// Écouteurs d'événements pour chaque fonctionnalité
const features = document.querySelectorAll('.features-item');
features.forEach(feature => {
    feature.addEventListener('click', () => {
        // Si la fonctionnalité est déjà ouverte, on la ferme
        if (feature.classList.contains('expanded')) {
            closeFeature(feature);
        } else {
            // Sinon, on affiche les détails
            expandFeature(feature);
            feature.classList.add('expanded');
        }
    });
});




document.addEventListener('DOMContentLoaded', function() {
    // Gestion des boutons "Voir plus de détails"
    const moreDetailsButtons = document.querySelectorAll('.more-details');
    const closeDetailsButtons = document.querySelectorAll('.close-details');
    const featureItems = document.querySelectorAll('.features-item');
    
    moreDetailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const featureItem = this.closest('.features-item');
            
            // Fermer tous les autres détails ouverts
            featureItems.forEach(item => {
                if (item !== featureItem) {
                    item.classList.remove('active');
                }
            });
            
            // Ouvrir le détail actuel
            featureItem.classList.add('active');
        });
    });
    
    closeDetailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            this.closest('.features-item').classList.remove('active');
        });
    });
    
    // Fermer en cliquant en dehors du détail
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.features-item') || e.target.closest('.features-item').classList.contains('active') && !e.target.closest('.feature-details')) {
            featureItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
});
