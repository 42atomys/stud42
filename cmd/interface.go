package cmd

import (
	"bufio"
	"fmt"
	"os/exec"

	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"
)

var (
	interfacePortFlag, interfaceServerJSFileFlag *string
)

// interfaceCmd represents the interface command
var interfaceCmd = &cobra.Command{
	Use:   "interface",
	Short: "Serve the NextJS interface in production",

	Run: func(cmd *cobra.Command, args []string) {
		// The static Next.js app will be served under `/`.
		yarn := exec.Command("node", *interfaceServerJSFileFlag, "--port", *interfacePortFlag)

		stdOut, err := yarn.StdoutPipe()
		if err != nil {
			log.Fatal().Err(err).Msg("Error creating StdoutPipe for Cmd")
		}
		defer stdOut.Close()

		stdErr, err := yarn.StderrPipe()
		if err != nil {
			log.Fatal().Err(err).Msg("Error creating StderrPipe for Cmd")
		}
		defer stdErr.Close()

		scanner := bufio.NewScanner(stdOut)
		go func() {
			for scanner.Scan() {
				log.Info().Str("process", "interface").Msg(scanner.Text())
			}
		}()

		scannerErr := bufio.NewScanner(stdErr)
		go func() {
			for scannerErr.Scan() {
				log.Error().Str("process", "interface").Msg(scannerErr.Text())
			}
		}()

		err = yarn.Start()
		if err != nil {
			log.Fatal().Err(err).Msg("Error during the start of interface")
		}

		log.Info().Str("process", "interface").Msgf("Serving NextJS interface on port %s", *interfacePortFlag)
		err = yarn.Wait()
		// go generate command will fail when no generate command find.
		if err != nil {
			if err.Error() != "exit status 1" {
				fmt.Println(err)
				log.Fatal().Err(err).Msg("Error during the execution of interface")
			}
		}
	},
}

func init() {
	serveCmd.AddCommand(interfaceCmd)

	interfacePortFlag = interfaceCmd.Flags().StringP("port", "p", "3000", "port used to serve the interface")
	interfaceServerJSFileFlag = interfaceCmd.Flags().StringP("serverPath", "n", "server.js", "NextJS Standalone app path")
}
