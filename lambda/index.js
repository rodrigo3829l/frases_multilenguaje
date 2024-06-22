const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {  
    en: {
        translation: {
            WELCOME_MESSAGE: 'Welcome to Car Curiosities! You can say, "Tell me a car curiosity". What would you like to do?',
            HELLO_MESSAGE: 'Hello! Welcome to Car Curiosities.',
            HELP_MESSAGE: 'You can ask me to tell you a car curiosity by saying, "Tell me a car curiosity". How can I assist you?',
            GOODBYE_MESSAGE: 'Goodbye! Come back soon for more car curiosities.',
            REFLECTOR_MESSAGE: 'You just triggered %s.',
            FALLBACK_MESSAGE: 'Sorry, I don\'t know about that. Please try again.',
            ERROR_MESSAGE: 'Sorry, I had trouble doing what you asked. Please try again.',
            CURIOSITY_MESSAGE: 'Here\'s a car curiosity: %s. Would you like to hear another one?',
            REPROMPT_MESSAGE: 'Would you like to hear another car curiosity?',
            CURIOSITIES: [
                'The Ferrari F40 was the last car personally approved by Enzo Ferrari before his death in 1988. It is famous for its design and performance, and was the first production car to exceed 320 km/h (200 mph).',
                'The Bugatti Veyron, launched in 2005, was the first production car to reach a top speed of over 400 km/h (250 mph). It requires 10 radiators to cool its various components.',
                'The Lamborghini Miura, introduced in 1966, is considered by many to be the first supercar. Its innovative design with a mid-rear engine revolutionized the automotive industry.',
                'The McLaren F1, launched in 1992, was the first production car to use a carbon fiber chassis. Its BMW V12 engine allowed it to hold the top speed record for a production car (386 km/h) for over a decade.',
                'The Porsche 911 has been in continuous production since 1964 and has won over 30,000 races worldwide. Its iconic rear-engine, rear-wheel-drive design has been a distinctive feature since its creation.',
                'The Chevrolet Corvette is the oldest continuously produced sports car in the United States. The original model was launched in 1953, and it has evolved significantly in design and performance since then.',
                'The Ford GT40 was specifically designed to defeat Ferrari at the 24 Hours of Le Mans, and it did so spectacularly, winning the race four consecutive times from 1966 to 1969.',
                'The Pagani Zonda is an exclusive sports car made in Italy. Each Zonda is handmade, and its unique design includes titanium and carbon-titanium components, making it extremely light and strong.',
                'The Koenigsegg Jesko, introduced in 2019, is one of the most technologically advanced sports cars. Its V8 engine can reach up to 1,600 horsepower with E85 fuel, and its advanced aerodynamic design allows it to reach extreme speeds.',
                'The Nissan GT-R, nicknamed "Godzilla" by its fans, is famous for its all-wheel-drive system and its ability to accelerate from 0 to 100 km/h in under 3 seconds. Its advanced technology and performance have made it an icon among sports cars.'
            ]
        }
    },
    es: {
        translation: {
            WELCOME_MESSAGE: '¡Bienvenido a Curiosidades sobre Autos! Puedes decir, "Dime una curiosidad de autos". ¿Qué te gustaría hacer?',
            HELLO_MESSAGE: '¡Hola! Bienvenido a Curiosidades sobre Autos.',
            HELP_MESSAGE: 'Puedes pedirme que te cuente una curiosidad de autos diciendo, "Dime una curiosidad de autos". ¿Cómo te puedo ayudar?',
            GOODBYE_MESSAGE: '¡Adiós! Vuelve pronto para más curiosidades sobre autos.',
            REFLECTOR_MESSAGE: 'Acabas de activar %s.',
            FALLBACK_MESSAGE: 'Lo siento, no sé sobre eso. Por favor inténtalo otra vez.',
            ERROR_MESSAGE: 'Lo siento, tuve problemas para hacer lo que pediste. Por favor intenta de nuevo.',
            CURIOSITY_MESSAGE: 'Aquí tienes una curiosidad de autos: %s. ¿Te gustaría escuchar otra?',
            REPROMPT_MESSAGE: '¿Te gustaría escuchar otra curiosidad de autos?',
            CURIOSITIES: [
                'El Ferrari F40 fue el último automóvil aprobado personalmente por Enzo Ferrari antes de su muerte en 1988. Es famoso por su diseño y rendimiento, y fue el primer automóvil de producción en superar los 320 km/h (200 mph).',
                'El Bugatti Veyron, lanzado en 2005, fue el primer auto de producción en alcanzar una velocidad máxima de más de 400 km/h (250 mph). Requiere 10 radiadores para enfriar sus diversos componentes.',
                'El Lamborghini Miura, presentado en 1966, es considerado por muchos como el primer superdeportivo del mundo. Su diseño innovador con motor central trasero revolucionó la industria automotriz.',
                'El McLaren F1, lanzado en 1992, fue el primer auto de producción en utilizar un chasis de fibra de carbono. Su motor V12 de BMW le permitió mantener el récord de velocidad máxima para un automóvil de producción (386 km/h) durante más de una década.',
                'El Porsche 911 ha estado en producción continua desde 1964 y ha ganado más de 30,000 carreras en todo el mundo. Su icónico diseño de motor trasero y tracción trasera ha sido una característica distintiva desde su creación.',
                'El Chevrolet Corvette es el auto deportivo más antiguo producido continuamente en Estados Unidos. El modelo original fue lanzado en 1953, y desde entonces ha evolucionado significativamente en diseño y rendimiento.',
                'El Ford GT40 fue diseñado específicamente para derrotar a Ferrari en las 24 Horas de Le Mans, y lo logró de manera espectacular, ganando la carrera cuatro veces consecutivas entre 1966 y 1969.',
                'El Pagani Zonda es un auto deportivo exclusivo fabricado en Italia. Cada Zonda está hecho a mano, y su diseño único incluye componentes de titanio y carbono-titanio, lo que lo hace extremadamente ligero y resistente.',
                'El Koenigsegg Jesko, presentado en 2019, es uno de los autos deportivos más avanzados tecnológicamente. Su motor V8 puede alcanzar hasta 1,600 caballos de fuerza con combustible E85, y su diseño aerodinámico avanzado le permite alcanzar velocidades extremas.',
                'El Nissan GT-R, apodado "Godzilla" por sus fanáticos, es famoso por su sistema de tracción total y su capacidad para acelerar de 0 a 100 km/h en menos de 3 segundos. Su tecnología avanzada y rendimiento lo han convertido en un ícono entre los autos deportivos.'
            ]
        }
    }
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELLO_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CuriositiIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CuriositiIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const curiosities = requestAttributes.t('CURIOSITIES');
        const randomIndex = Math.floor(Math.random() * curiosities.length);
        const curiosity = curiosities[randomIndex];
        const speakOutput = requestAttributes.t('CURIOSITY_MESSAGE', curiosity);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(requestAttributes.t('REPROMPT_MESSAGE'))
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = requestAttributes.t('REFLECTOR_MESSAGE', intentName);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR_MESSAGE');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const LocalizationInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            fallbackLng: 'en',
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: languageStrings,
            returnObjects: true
        });

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function (...args) {
            return localizationClient.t(...args);
        }
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        CuriositiIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalizationInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
