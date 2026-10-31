'use strict';
const DEMOS={
  "press:machine": {
    "id": "Machine_Bench_Press",
    "images": [
      "Machine_Bench_Press/0.jpg",
      "Machine_Bench_Press/1.jpg"
    ],
    "source": "https://github.com/yuhonas/free-exercise-db",
    "sourceRevision": "f00c92c7dcf1216a928a52c3706c7ce8e2f71ed5",
    "local": "./media/Machine_Bench_Press.webp",
    "note": "Equipamento de referência. O modelo da sua academia pode ter aparência e ajustes diferentes."
  },
  "press:free": {
    "id": "Dumbbell_Bench_Press",
    "images": [
      "Dumbbell_Bench_Press/0.jpg",
      "Dumbbell_Bench_Press/1.jpg"
    ],
    "source": "https://github.com/yuhonas/free-exercise-db",
    "sourceRevision": "f00c92c7dcf1216a928a52c3706c7ce8e2f71ed5",
    "local": "./media/Dumbbell_Bench_Press.webp",
    "note": "Demonstração de referência: execute devagar e com uma carga adequada para você."
  },
  "row:machine": {
    "id": "Leverage_Iso_Row",
    "images": [
      "Leverage_Iso_Row/0.jpg",
      "Leverage_Iso_Row/1.jpg"
    ],
    "source": "https://github.com/yuhonas/free-exercise-db",
    "sourceRevision": "f00c92c7dcf1216a928a52c3706c7ce8e2f71ed5",
    "local": "./media/Leverage_Iso_Row.webp",
    "note": "Exemplo de remada com anilhas e apoio no peito. A sua máquina pode usar torre de pesos. Ajustes e cargas variam conforme o modelo."
  },
  "row:free": {
    "id": "One-Arm_Dumbbell_Row",
    "images": [
      "One-Arm_Dumbbell_Row/0.jpg",
      "One-Arm_Dumbbell_Row/1.jpg"
    ],
    "source": "https://github.com/yuhonas/free-exercise-db",
    "sourceRevision": "f00c92c7dcf1216a928a52c3706c7ce8e2f71ed5",
    "local": "./media/One-Arm_Dumbbell_Row.webp",
    "note": "Demonstração de referência: execute devagar e com uma carga adequada para você."
  },
  "shoulder:machine": {
    "id": "Machine_Shoulder_Military_Press",
    "images": [
      "Machine_Shoulder_Military_Press/0.jpg",
      "Machine_Shoulder_Military_Press/1.jpg"
    ],
    "source": "https://github.com/yuhonas/free-exercise-db",
    "sourceRevision": "f00c92c7dcf1216a928a52c3706c7ce8e2f71ed5",
    "local": "./media/Machine_Shoulder_Military_Press.webp",
    "note": "Equipamento de referência. O modelo da sua academia pode ter aparência e ajustes diferentes."
  },
  "shoulder:free": {
    "id": "Dumbbell_Shoulder_Press",
    "images": [
      "Dumbbell_Shoulder_Press/0.jpg",
      "Dumbbell_Shoulder_Press/1.jpg"
    ],
    "source": "https://github.com/yuhonas/free-exercise-db",
    "sourceRevision": "f00c92c7dcf1216a928a52c3706c7ce8e2f71ed5",
    "local": "./media/Dumbbell_Shoulder_Press.webp",
    "note": "Demonstração de referência: execute devagar e com uma carga adequada para você."
  },
  "curl:machine": {
    "id": "Machine_Bicep_Curl",
    "images": [
      "Machine_Bicep_Curl/0.jpg",
      "Machine_Bicep_Curl/1.jpg"
    ],
    "source": "https://github.com/yuhonas/free-exercise-db",
    "sourceRevision": "f00c92c7dcf1216a928a52c3706c7ce8e2f71ed5",
    "local": "./media/Machine_Bicep_Curl.webp",
    "note": "Equipamento de referência. O modelo da sua academia pode ter aparência e ajustes diferentes."
  },
  "curl:free": {
    "id": "Dumbbell_Bicep_Curl",
    "images": [
      "Dumbbell_Bicep_Curl/0.jpg",
      "Dumbbell_Bicep_Curl/1.jpg"
    ],
    "source": "https://github.com/yuhonas/free-exercise-db",
    "sourceRevision": "f00c92c7dcf1216a928a52c3706c7ce8e2f71ed5",
    "local": "./media/Dumbbell_Bicep_Curl.webp",
    "note": "Demonstração de referência: execute devagar e com uma carga adequada para você."
  },
  "squat:machine": {
    "id": "Leg_Press",
    "images": [
      "Leg_Press/0.jpg",
      "Leg_Press/1.jpg"
    ],
    "source": "https://github.com/yuhonas/free-exercise-db",
    "sourceRevision": "f00c92c7dcf1216a928a52c3706c7ce8e2f71ed5",
    "local": "./media/Leg_Press.webp",
    "note": "Equipamento de referência. O modelo da sua academia pode ter aparência e ajustes diferentes."
  },
  "squat:free": {
    "id": "Dumbbell_Squat_To_A_Bench",
    "images": [
      "Dumbbell_Squat_To_A_Bench/0.jpg",
      "Dumbbell_Squat_To_A_Bench/1.jpg"
    ],
    "source": "https://github.com/yuhonas/free-exercise-db",
    "sourceRevision": "f00c92c7dcf1216a928a52c3706c7ce8e2f71ed5",
    "local": "./media/Dumbbell_Squat_To_A_Bench.webp",
    "note": "A foto mostra halteres ao lado do corpo. Na sua adaptação inicial, faça sem peso, tocando um banco firme. Não precisa usar os pesos da foto."
  },
  "hinge:free": {
    "id": "Butt_Lift_Bridge",
    "images": [
      "Butt_Lift_Bridge/0.jpg",
      "Butt_Lift_Bridge/1.jpg"
    ],
    "source": "https://github.com/yuhonas/free-exercise-db",
    "sourceRevision": "f00c92c7dcf1216a928a52c3706c7ce8e2f71ed5",
    "local": "./media/Butt_Lift_Bridge.webp",
    "note": "Demonstração de referência: execute devagar e com uma carga adequada para você."
  },
  "legcurl:machine": {
    "id": "Seated_Leg_Curl",
    "images": [
      "Seated_Leg_Curl/0.jpg",
      "Seated_Leg_Curl/1.jpg"
    ],
    "source": "https://github.com/yuhonas/free-exercise-db",
    "sourceRevision": "f00c92c7dcf1216a928a52c3706c7ce8e2f71ed5",
    "local": "./media/Seated_Leg_Curl.webp",
    "note": "Equipamento de referência. O modelo da sua academia pode ter aparência e ajustes diferentes."
  },
  "legcurl:free": {
    "id": "Platform_Hamstring_Slides",
    "images": [
      "Platform_Hamstring_Slides/0.jpg",
      "Platform_Hamstring_Slides/1.jpg"
    ],
    "source": "https://github.com/yuhonas/free-exercise-db",
    "sourceRevision": "f00c92c7dcf1216a928a52c3706c7ce8e2f71ed5",
    "local": "./media/Platform_Hamstring_Slides.webp",
    "note": "Demonstração de referência: execute devagar e com uma carga adequada para você."
  },
  "calf:machine": {
    "id": "Seated_Calf_Raise",
    "images": [
      "Seated_Calf_Raise/0.jpg",
      "Seated_Calf_Raise/1.jpg"
    ],
    "source": "https://github.com/yuhonas/free-exercise-db",
    "sourceRevision": "f00c92c7dcf1216a928a52c3706c7ce8e2f71ed5",
    "local": "./media/Seated_Calf_Raise.webp",
    "note": "Exemplo de máquina sentada. Se a academia tiver outro modelo, peça ao instrutor para conferir a posição e não compare cargas entre máquinas."
  },
  "calf:free": {
    "id": "Standing_Dumbbell_Calf_Raise",
    "images": [
      "Standing_Dumbbell_Calf_Raise/0.jpg",
      "Standing_Dumbbell_Calf_Raise/1.jpg"
    ],
    "source": "https://github.com/yuhonas/free-exercise-db",
    "sourceRevision": "f00c92c7dcf1216a928a52c3706c7ce8e2f71ed5",
    "local": "./media/Standing_Dumbbell_Calf_Raise.webp",
    "note": "A foto usa halteres e uma base elevada. Comece no chão, sem carga, segurando um apoio estável."
  },
  "core:machine": {
    "id": "Ab_Crunch_Machine",
    "images": [
      "Ab_Crunch_Machine/0.jpg",
      "Ab_Crunch_Machine/1.jpg"
    ],
    "source": "https://github.com/yuhonas/free-exercise-db",
    "sourceRevision": "f00c92c7dcf1216a928a52c3706c7ce8e2f71ed5",
    "local": "./media/Ab_Crunch_Machine.webp",
    "note": "Equipamento de referência. O modelo da sua academia pode ter aparência e ajustes diferentes."
  },
  "core:free": {
    "id": "Dead_Bug",
    "images": [
      "Dead_Bug/0.jpg",
      "Dead_Bug/1.jpg"
    ],
    "source": "https://github.com/yuhonas/free-exercise-db",
    "sourceRevision": "f00c92c7dcf1216a928a52c3706c7ce8e2f71ed5",
    "local": "./media/Dead_Bug.webp",
    "note": "Demonstração de referência: execute devagar e com uma carga adequada para você."
  },
  "hinge:machine": {
    "local": "https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/Equipment/Strength/Plate-Loaded/Glute%20Drive/Strength-PlateLoaded-GluteDrive-8.png",
    "source": "https://www.lifefitness.com/en-eu/catalog/strength-training/plate-loaded/hammer-strength-plate-loaded-glute-drive",
    "manufacturer": true,
    "note": "Foto do equipamento Hammer Strength Glute Drive. Esta imagem identifica a máquina; não é uma sequência de execução. Confira o cinto, os apoios e as travas com o instrutor. O aparelho da sua academia pode ser diferente."
  }
};
