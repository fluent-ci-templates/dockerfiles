import { Dockerfile } from "https://deno.land/x/fluentdocker/mod.ts";

const image = new Dockerfile()
  .from("alpine:latest")
  .run("apk update")
  .run("apk add curl bash python3 alpine-sdk")
  .run(
    'curl --proto =https --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install linux --extra-conf "sandbox = false" --init none --no-confirm'
  )
  .env("PATH", "${PATH}:/nix/var/nix/profiles/default/bin")
  .run(
    "sed -i 's/auto-allocate-uids = true/auto-allocate-uids = false/g' /etc/nix/nix.conf"
  )
  .cmd("nix --version");

const dockerfile = image.toString();

console.log(dockerfile);
